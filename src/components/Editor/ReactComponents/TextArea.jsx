/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
// import React from 'react';
import React, {useState} from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import { Input } from 'antd';
const { TextArea: TextBoxArea } = Input;
import './TextArea.scss';
import debounce from 'lodash.debounce';


function TextArea({node, updateAttributes}) {
  const [placeholder, setPlaceholder] = useState(node?.attrs?.placeholder);
  const onPlaceholderChange = (value) => {
    updateAttributes({'placeholder': value})
  }

  const onChangeDebounce = debounce(onPlaceholderChange, 250);

  return (
    <NodeViewWrapper>
      <div className="mainTextbox" suppressContentEditableWarning contentEditable="false">
        <div contentEditable="true">
          <NodeViewContent />
        </div>
        <TextBoxArea rows={4} 
        className="textbox" 
          value={placeholder}
          placeholder='Enter placeholder'
          onChange={(e)=>{
            setPlaceholder(e.target.value);
            onChangeDebounce(e.target.value);
          }}
        />
      </div>
    </NodeViewWrapper>
  );
}

export default TextArea;