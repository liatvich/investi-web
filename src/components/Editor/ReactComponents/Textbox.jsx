/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { TextField } from '@mui/material';
import './Textbox.scss';

function Textbox() {
  return (
    <NodeViewWrapper>
      <div className="mainTextbox">
        <NodeViewContent />
        <TextField id="filled-basic" variant="standard" className="textbox" />
      </div>
    </NodeViewWrapper>
  );
}

export default Textbox;
