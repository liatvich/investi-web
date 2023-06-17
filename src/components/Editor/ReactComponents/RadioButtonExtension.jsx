import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import RadioButton from './RadioButton';

export default Node.create({
  name: 'radioButton',
  group: 'block',
  content: 'text*',
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
        tag: 'radioButton',
      },
    ];
  },

  addCommands() {
    return {
      toggleRadioButton: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
    };
  },

  // addKeyboardShortcuts() {
  //   const shortcuts = {
  //     Enter: () => {
  //       this.editor.commands.sinkListItem('radioButton');
  //     },
  //   };

  //   if (!this.options.nested) {
  //     return shortcuts;
  //   }

  //   return {
  //     ...shortcuts,
  //     Tab: () => this.editor.commands.sinkListItem('radioButton'),
  //   };
  // },

  renderHTML({ HTMLAttributes }) {
    return ['radioButton', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(RadioButton);
  },
});
