/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import { Divider } from "antd";
// import './ConditionalRadioButton.scss';

function ConditionalContent() {
  return (
    <NodeViewWrapper>
      <Divider> Condition Start </Divider>
      <div suppressContentEditableWarning contentEditable="true">
        <NodeViewContent />
      </div>
      <Divider> Condition End </Divider>
    </NodeViewWrapper>
  );
}

export default ConditionalContent;
