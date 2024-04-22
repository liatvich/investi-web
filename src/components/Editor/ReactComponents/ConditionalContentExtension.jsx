
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import ConditionalContent from './ConditionalContent';

export default Node.create({
  name: 'conditionalContent',
  // allowGapCursor: true,
  // atom: true,
  // selectable: true,
  // group: 'block',
  // draggable: true,
  // isolating: false,
  // marks: '_',
  // content: 'block*',
  // defining: true,

  group: 'block',
  content: 'block*',

  addAttributes() {
    return {
      value: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'conditionalContent',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
      return ['conditionalContent', mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      toggleConditionalContent: (attributes) => ({ commands }) => {
        commands.wrapIn(this.type, attributes);
      },
      unToggleConditionalContent: () => ({ commands }) => {
        commands.clearNodes();
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ConditionalContent);
  },
});
