import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import DropDown from './DropDown';

export default Node.create({
  name: 'drop_down',
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
      chosenValue: '',
      dropDownValues: [],
    };
  },
  parseHTML() {
    return [
      {
        tag: 'drop_down',
      },
    ];
  },

  addCommands() {
    return {
      toggleDropDown: () => ({ commands }) => {
        commands.toggleNode(this.name, 'text', {});
      },
      unToggleDropDown: () => ({ commands }) => {
        commands.clearNodes();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['drop_down', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DropDown);
  },
});
