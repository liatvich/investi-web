import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import Textbox from './Textbox';

export default Node.create({
  name: 'textbox',
  group: 'block',
  content: 'text*',
  parseHTML() {
    return [
      {
        tag: 'textbox',
      },
    ];
  },

  addCommands() {
    return {
      toggleTextbox: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['textbox', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Textbox);
  },
});
