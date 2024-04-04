import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import ReadText from './ReadText';

export default Node.create({
  name: 'read_text',
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
        tag: 'read_text',
      },
    ];
  },

  addCommands() {
    return {
      toggleReadText: () => ({ commands }) => {
        commands.toggleNode(this.name, 'paragraph', {});
      },
      unToggleReadText: () => ({ commands }) => {
        commands.clearNodes();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['read_text', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ReadText);
  },
});
