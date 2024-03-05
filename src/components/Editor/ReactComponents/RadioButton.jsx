/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import {
  Radio,
} from '@mui/material';
import './RadioButton.scss';

function RadioButton() {
  return (
    <NodeViewWrapper>
      <div suppressContentEditableWarning className="content" contentEditable="true">
        <div contentEditable="true">
          <Radio />
        </div>
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
}

export default RadioButton;
