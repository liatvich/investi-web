import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import ValidationCheckbox from './ValidationCheckbox';

export default Node.create({
  name: 'validationCheckbox',
  group: 'block',
  content: 'text*',
  addAttributes() {
    return {
      isChecked: {
        default: false,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'validationCheckbox',
      },
      {
        tag: 'text',
      },
    ];
  },

  addCommands() {
    return {
      toggleValidationCheckbox: () => ({ commands }) => {
        commands.toggleNode(this.name, 'paragraph', {});
      },
    };
  },

  //   addKeyboardShortcuts() {
  //     const shortcuts = {
  //       Enter: () => this.editor.commands.splitListItem('validationCheckbox'),
  //     };

  //     if (!this.options.nested) {
  //       return shortcuts;
  //     }

  //     return {
  //       ...shortcuts,
  //       Tab: () => this.editor.commands.sinkListItem('validationCheckbox'),
  //     };
  //   },

  renderHTML({ HTMLAttributes }) {
    return ['validationCheckbox', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ValidationCheckbox);
  },
});
