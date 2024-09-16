import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import NumberInput from './NumberInput';

export default Node.create({
  name: 'number_input',
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
        chosenValue: 0,
      },
      suffixText: '',
      prefixText: '',
      minValue: Number.MIN_SAFE_INTEGER,
      maxValue: Number.MAX_SAFE_INTEGER,
      intervalValue: 1,
    };
  },
  parseHTML() {
    return [
      {
        tag: 'number_input',
      },
    ];
  },

  addCommands() {
    return {
      toggleNumberInput: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
      unToggleNumberInput: () => ({ commands }) => {
        commands.clearNodes();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['number_input', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(NumberInput);
  },
});
