/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { FormControl, Checkbox } from '@mui/material';
import s from './PreviewParser.module.scss';
import { PreviewText } from './PreviewText';

export function PreviewValidationCheckbox({ node }) {
  const [value, setValue] = useState(node?.attrs?.isChecked);
  const [isValid, setIsValid] = useState(node?.attrs?.isValid);

  useEffect(() => {
    setValue(node?.attrs?.isChecked);
    if (!node?.attrs?.isValid) {
      setIsValid(false);
    }
  }, [node]);

  return (
    <FormControl
      key={Math.floor(Math.random() * 1000 + 1)}
      required
      component="fieldset"
      variant="standard"
    >
      <div className={s.validation}>
        <Checkbox
          disableRipple
          key={Math.floor(Math.random() * 1000 + 1)}
          onChange={(event) => {
            if (node?.attrs) {
              // eslint-disable-next-line no-param-reassign
              node.attrs.isChecked = event.target.checked;
            }
            setValue(event.target.checked);
            setIsValid(event?.target?.checked);
          }}
          checked={value}
          sx={isValid ? {
            color: 'black',
          } : {
            color: 'red',
          }}
        />
        {node
        && <PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />}
      </div>
    </FormControl>
  );
}

export default PreviewValidationCheckbox;
