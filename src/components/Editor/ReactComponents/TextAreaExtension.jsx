
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import TextArea from './TextArea';

export default Node.create({
  name: 'textarea',
  atom: true,
  group: 'block',
  content: 'text*',

  addAttributes() {
    return {
      value: {
        default: '',
      },
      placeholder: '',
    };
  },

  parseHTML() {
    return [
      {
        tag: `textarea`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['textarea', mergeAttributes(HTMLAttributes)];
  },

  renderText({ node }) {
    return `@${node.attrs.id}`
  },

  addCommands() {
    return {
      toggleTextArea: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
      unToggleTextArea: () => ({ commands }) => {
        commands.clearNodes();
      },
    };
  },


  addNodeView() {
    return ReactNodeViewRenderer(TextArea);
  },
});
