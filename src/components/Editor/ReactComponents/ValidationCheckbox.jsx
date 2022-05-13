/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import { Checkbox } from '@mui/material';
import './ValidationCheckbox.scss';

function ValidationCheckbox(props) {
  const check = (value) => {
    props.updateAttributes({
      isChecked: value,
    });
  };
  //* <NodeViewContent /> *

  return (
    <NodeViewWrapper>
      <div suppressContentEditableWarning className="validation">
        <div contentEditable="false">
          <Checkbox
            checked={props.node.attrs.isChecked}
            onChange={(event) => check(event.target.checked)}
          />
        </div>
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
}

export default ValidationCheckbox;
