/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NodeViewWrapper } from '@tiptap/react'; // NodeViewContent
import {
  Radio, FormControlLabel,
} from '@mui/material';
import './Scale.scss';

function Scale() {
  return (
    <NodeViewWrapper>
      <div suppressContentEditableWarning className="content" contentEditable="false">
        <div className="scale_ratio_button">
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
        </div>
      </div>
    </NodeViewWrapper>
  );
}

export default Scale;
