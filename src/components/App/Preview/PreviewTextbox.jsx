/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import s from './PreviewParser.module.scss';
import { PreviewText } from './PreviewText';

export function PreviewTextbox({ node, disabled }) {
  const [value, setValue] = useState(node?.attrs?.value);

  useEffect(() => {
    setValue(node?.attrs?.value);
  }, [node]);

  return (
    <div className={s.mainTextbox}>
      {node
        && <PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />}
      <TextField
        id="filled-basic"
        variant="standard"
        className={s.textbox}
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

export default PreviewTextbox;
