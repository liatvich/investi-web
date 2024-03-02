import { mergeAttributes, Node, wrappingInputRule } from '@tiptap/core';
// import { Node as ProseMirrorNode } from 'prosemirror-model';

export const TASK_ITEM_TYPE = 'taskItem';

// export interface TaskItemOptions {
//   onReadOnlyChecked?: (node: ProseMirrorNode, checked: boolean) => boolean
//   nested: boolean
//   HTMLAttributes: Record<string, string>
//   noteDate?: string
//   projectName?: string
// }

export const inputRegex = /^\s*(\[([( |x])?\])\s$/;

export default Node.create({
  name: TASK_ITEM_TYPE,

  addOptions() {
    return {
      nested: false,
      HTMLAttributes: {},
      noteDate: '',
      projectName: '',
    };
  },

  allowGapCursor: true,
  atom: true,
  selectable: true,
  group: 'block',
  draggable: true,
  isolating: false,
  marks: '_',
  content: 'text*',

  // content() {
  //   return this.options.nested ? 'paragraph block*' : 'paragraph+';
  // },

  defining: true,

  addAttributes() {
    return {
      checked: {
        default: false,
        keepOnSplit: false,
        parseHTML: (element) => element.getAttribute('data-checked') === 'true',
        renderHTML: (attributes) => ({
          'data-checked': attributes.checked,
        }),
      },
      projectName: { default: this.options.projectName || '' },
      noteDate: { default: this.options.noteDate || '' },
      id: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'li',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': this.name,
      }),
      ['label', ['button']],
      ['div', 0],
    ];
  },

  addKeyboardShortcuts() {
    const shortcuts = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
    };

    if (!this.options.nested) {
      return shortcuts;
    }

    return {
      ...shortcuts,
      Tab: () => this.editor.commands.sinkListItem(this.name),
    };
  },

  addCommands() {
    return {
      toggleTaskButton: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
    };
  },

  addNodeView() {
    return ({
      node, HTMLAttributes, getPos, editor,
    }) => {
      const listItem = document.createElement('li');
      const checkboxWrapper = document.createElement('label');
      checkboxWrapper.classList.add('my-0');
      const checkboxButton = document.createElement('button');
      checkboxButton.classList.add(
        'checkbox',
        'checkbox-accent',
        'transition-all',
        'hover:bg-accent',
      );
      const content = document.createElement('div');
      content.classList.add('my-0');
      content.classList.add('w-full');
      checkboxWrapper.contentEditable = 'false';
      checkboxWrapper.addEventListener('click', () => {
        // If the editor isn’t editable break early
        if (!editor.isEditable) {
          return;
        }
        // reverse the value
        const checked = listItem.dataset.checked !== 'true';
        checkboxButton.setAttribute('checked', checked ? 'checked' : '');
        // checkboxButton.classList.toggle('btn-ghost')
        // checkboxButton.classList.toggle('btn-outline')
        if (editor.isEditable && typeof getPos === 'function') {
          editor
            .chain()
            .focus(undefined, { scrollIntoView: false })
            .command(({ tr }) => {
              const position = getPos();
              const currentNode = tr.doc.nodeAt(position);
              tr.setNodeMarkup(position, undefined, {
                ...(currentNode === null || currentNode === null
                  ? null
                  : currentNode.attrs),
                checked,
              });
              return true;
            })
            .run();
        }
      });
      Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
        listItem.setAttribute(key, value);
      });
      listItem.dataset.checked = node.attrs.checked;
      checkboxWrapper.append(checkboxButton);
      listItem.append(checkboxWrapper, content);
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        listItem.setAttribute(key, value);
      });
      return {
        dom: listItem,
        contentDOM: content,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }
          listItem.dataset.checked = updatedNode.attrs.checked;
          return true;
        },
      };
    };
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => ({
          checked: match[match.length - 1] === 'x',
        }),
      }),
    ];
  },
});
