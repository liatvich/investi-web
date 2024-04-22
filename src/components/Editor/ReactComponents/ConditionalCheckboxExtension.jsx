
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import ConditionalCheckbox from './ConditionalCheckbox';

export default Node.create({
  name: 'conditionalCheckbox',
  group: "block",
  content: "inline*",

  addAttributes() {
    return {
      value: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'li',
      ['checkbox', mergeAttributes(HTMLAttributes)],
    ];
  },

  addCommands() {
    return {
      toggleConditionalCheckbox: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
      unToggleConditionalCheckbox: () => ({ commands }) => {
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
    return ReactNodeViewRenderer(ConditionalCheckbox);
  },
});
