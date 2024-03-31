import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import ImageUploader from './ImageUploader';

export default Node.create({
  name: 'imageUploader',
  allowGapCursor: true,
  atom: true,
  selectable: true,
  group: 'block',
  content: 'inline*',
  draggable: true,
  isolating: true,

  addAttributes() {
    return {
      filePath: '',
    };
  },
  parseHTML() {
    return [
      {
        tag: 'imageUploader',
      },
    ];
  },

  addCommands() {
    return {
      toggleImageUploader: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['imageUploader', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploader);
  },
});
