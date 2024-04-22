import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import ConditionalRadioButton from './ConditionalRadioButton';

export default Node.create({
  name: 'conditionalRadioButton',
  group: "block",
  content: "inline*",

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
      toggleConditionalRadioButton: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
      unToggleConditionalRadioButton: () => ({ commands }) => {
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
    return ReactNodeViewRenderer(ConditionalRadioButton);
  },
});
