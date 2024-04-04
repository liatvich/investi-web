/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {useState} from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import './ReadText.scss';
import { Input } from 'antd';
import debounce from 'lodash.debounce';
import { ScanOutlined } from '@ant-design/icons';
import { Button } from 'antd';


function ReadText({node, updateAttributes}) {

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
        <div className='textAndScan'>
          <Input className="textbox" 
          value={placeholder}
          placeholder='Enter placeholder'
          onChange={(e)=>{
            setPlaceholder(e.target.value);
            onChangeDebounce(e.target.value);
          }}></Input>
          <Button icon={<ScanOutlined/>}/>
         </div>
      </div>
    </NodeViewWrapper>
  );
}

export default ReadText;
