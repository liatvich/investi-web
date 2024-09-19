import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import DatePicker from './DatePicker';

export default Node.create({
  name: 'date_picker',
  group: 'inline',
  marks: '',
  // atom: true,
  inline: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      value: '',
    };
  },
  parseHTML() {
    return [
      {
        tag: 'date_picker',
      },
    ];
  },

  addCommands() {
    return {
      addDatePicker:
      () =>
      ({ commands, state }) => 
        commands.insertContentAt({from: state.selection.anchor, to:state.selection.anchor} ,{
          type: this.name,
        }),
      unToggleDatePicker: () => ({ commands }) => {
        commands.clearNodes();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['date_picker', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DatePicker);
  },
});
