import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import Scale from './Scale';

export default Node.create({
  name: 'scale_ratio_button',
  // group: 'block',
  // content: 'text*',
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
        chosenValue: '1',
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'scale_ratio_button',
      },
    ];
  },

  addCommands() {
    return {
      toggleScaleRadioButton: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['scale_ratio_button', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Scale);
  },
});
