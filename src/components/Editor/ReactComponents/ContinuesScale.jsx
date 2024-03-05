/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import { Slider } from 'antd';
import './ContinuesScale.scss';

function ContinuesScale() {
  // const [value, setValue] = useState(0);

  return (
    <NodeViewWrapper>
      <div suppressContentEditableWarning className="content" contentEditable="true">
        <NodeViewContent />
        <div className="continues_slide">
          <Slider defaultValue={50} />
        </div>
      </div>
    </NodeViewWrapper>
  );
}

export default ContinuesScale;
