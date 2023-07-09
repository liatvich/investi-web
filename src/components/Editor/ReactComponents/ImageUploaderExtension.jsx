import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import ImageUploader from './ImageUploader';

export default Node.create({
  name: 'imageUploader',
  group: 'block',
  content: 'text*',
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