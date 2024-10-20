import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import CheckboxScore from './CheckboxScore';

export default Node.create({
  name: 'checkboxScore',
  group: "block",
  content: "inline*",

  addAttributes() {
    return {
      value: {
        default: '',
      },
      score: {
        default: 0,
      },
      summary: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        getAttrs: (element) => ({
          score: element.getAttribute('data-score'),
          value: element.getAttribute('data-value'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'li',
      mergeAttributes(HTMLAttributes, { 
        'data-type': this.name,
        'data-score': HTMLAttributes.score,
        'data-value': HTMLAttributes.value
      }),
    ];
  },

  addCommands() {
    return {
      toggleCheckboxScore: () => ({ commands }) => {
        commands.toggleNode(this.name, 'paragraph', {});
      },
      unToggleCheckboxScore: () => ({ commands }) => {
        commands.clearNodes();
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
    return ReactNodeViewRenderer(CheckboxScore);
  },
});
