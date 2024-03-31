/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { PreviewText } from './PreviewText';
import s from './PreviewTextbox.module.scss';

export function PreviewTextbox({ node, disabled }) {
  const [value, setValue] = useState(node?.attrs?.value);

  useEffect(() => {
    setValue(node?.attrs?.value);
  }, [node]);

  return (
    <div className={s.mainTextBox}>
      {node
        && <div className={s.top}>
            <PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />
          </div>}
          <Input 
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
        }
        }></Input>
    </div>
  );
}

export default PreviewTextbox;
