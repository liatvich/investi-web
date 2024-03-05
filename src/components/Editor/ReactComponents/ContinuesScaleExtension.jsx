import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import ContinuesScale from './ContinuesScale';

export default Node.create({
  name: 'scale_continues',
  // group: 'block',
  // content: 'text*',
  allowGapCursor: true,
  atom: false,
  selectable: true,
  group: 'block',
  draggable: false,
  marks: '_',
  content: 'text*',
  defining: true,

  addAttributes() {
    return {
      value: {
        chosenValue: 50,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'scale_continues',
      },
    ];
  },

  addCommands() {
    return {
      toggleScaleContinues: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
      unToggleScaleContinues: () => ({ commands }) => {
        commands.clearNodes();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['scale_continues', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ContinuesScale);
  },
});
