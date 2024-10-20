import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import RadioButtonScore from './RadioButtonScore';

export default Node.create({
  name: 'radioButtonScore',
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
        getAttrs: (element) => ({
          score: element.getAttribute('data-score'),
          value: element.getAttribute('data-value'),
        }),
      },
    ];
  },

  // renderHTML({ HTMLAttributes }) {
  //   return ['radioButton', mergeAttributes(HTMLAttributes)];
  // },

  renderHTML({ HTMLAttributes }) {
    return [
      'li',
      ['radioButtonScore', mergeAttributes(HTMLAttributes)],
    ];
  },

  addCommands() {
    return {
      toggleRadioButtonScore: () => ({ commands }) => {
        commands.toggleNode(this.name, 'paragraph', {});
      },
      unToggleRadioButtonScore: () => ({ commands }) => {
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
    return ReactNodeViewRenderer(RadioButtonScore);
  },
});
