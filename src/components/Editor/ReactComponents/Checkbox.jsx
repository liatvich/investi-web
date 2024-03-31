/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import { Checkbox as CheckboxComponent } from 'antd';


function Checkbox({value}) {
  return (
    <NodeViewWrapper>
      <div suppressContentEditableWarning className="content" contentEditable="true">
        <div contentEditable="true">
          <CheckboxComponent 
            checked={value}
          />
        </div>
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
}

export default Checkbox;
