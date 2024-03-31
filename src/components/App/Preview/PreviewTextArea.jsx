/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
import s from './PreviewTextArea.module.scss';
import { PreviewText } from './PreviewText';

export function PreviewTextArea({ node, disabled }) {
  const [value, setValue] = useState(node?.attrs?.value);

  useEffect(() => {
    setValue(node?.attrs?.value);
  }, [node]);

  return (
    <div className={s.text_box_area}>
      {node
        && <div className={s.top}><PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} /></div>}
        <TextArea rows={4} 
        placeholder={node?.attrs?.placeholder}
        value={value}
        disabled={disabled}
        onChange={(event) => {
          // eslint-disable-next-line no-param-reassign
          if (node?.attrs) {
            // eslint-disable-next-line no-param-reassign
            node.attrs.value = event.target.value;
          }
          setValue(event.target.value);
        }}
      />
    </div>
  );
}

export default PreviewTextArea;
