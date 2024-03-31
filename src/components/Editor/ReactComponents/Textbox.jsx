/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {useState} from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import './Textbox.scss';
import { Input } from 'antd';
import debounce from 'lodash.debounce';

function Textbox({node, updateAttributes}) {

  const [placeholder, setPlaceholder] = useState(node?.attrs?.placeholder);

  const onPlaceholderChange = (value) => {
    updateAttributes({'placeholder': value})
  }

  const onChangeDebounce = debounce(onPlaceholderChange, 250);


  return (
    <NodeViewWrapper>
      <div className="mainTextbox" suppressContentEditableWarning contentEditable="false">
        <div  contentEditable="true">
          <NodeViewContent />
        </div>
        <Input className="textbox" 
        value={placeholder}
        placeholder='Enter placeholder'
        onChange={(e)=>{
          setPlaceholder(e.target.value);
          onChangeDebounce(e.target.value);
        }}></Input>
      </div>
    </NodeViewWrapper>
  );
}

export default Textbox;
