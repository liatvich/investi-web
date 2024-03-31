import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import Textbox from './Textbox';

export default Node.create({
  name: 'textbox',
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
        tag: 'textbox',
      },
    ];
  },

  addCommands() {
    return {
      toggleTextbox: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
      unToggleTextbox: () => ({ commands }) => {
        commands.clearNodes();
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
