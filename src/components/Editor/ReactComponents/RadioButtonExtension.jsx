import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import RadioButton from './RadioButton';

export default Node.create({
  name: 'radioButton',
  allowGapCursor: true,
  atom: true,
  selectable: true,
  group: 'block',
  draggable: true,
  isolating: false,
  marks: '_',
  content: 'text*',
  defining: true,

  addAttributes() {
    return {
      value: {
        default: '',
      },
    };
  },
  // parseHTML() {
  //   return [
  //     {
  //       tag: 'radioButton',
  //     },
  //   ];
  // },

  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
      },
    ];
  },

  // renderHTML({ HTMLAttributes }) {
  //   return ['radioButton', mergeAttributes(HTMLAttributes)];
  // },

  renderHTML({ HTMLAttributes }) {
    return [
      'li',
      ['radioButton', mergeAttributes(HTMLAttributes)],
    ];
  },

  addCommands() {
    return {
      toggleRadioButton: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
    };
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

  addNodeView() {
    return ReactNodeViewRenderer(RadioButton);
  },
});
