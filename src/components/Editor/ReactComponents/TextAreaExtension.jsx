
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import TextArea from './TextArea';

export default Node.create({
  name: 'textarea',
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
