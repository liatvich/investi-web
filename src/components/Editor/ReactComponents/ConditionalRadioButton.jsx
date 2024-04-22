/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import { Radio } from "antd";
import './ConditionalRadioButton.scss';

function ConditionalRadioButton() {
  return (
    <NodeViewWrapper>
      <div suppressContentEditableWarning className="contentConditionalRadioButton" contentEditable="true">
        <div contentEditable="true">
          <Radio />
        </div>
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
}

export default ConditionalRadioButton;
