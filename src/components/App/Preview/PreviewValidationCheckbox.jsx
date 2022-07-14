/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { FormControl, Checkbox } from '@mui/material';
import s from './PreviewParser.module.scss';
import { PreviewText } from './PreviewText';

export function PreviewValidationCheckbox({ node }) {
  const [value, setValue] = useState(node?.attrs?.isChecked);

  useEffect(() => {
    setValue(node?.attrs?.isChecked);
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
          key={Math.floor(Math.random() * 1000 + 1)}
          onChange={(event) => {
            if (node?.attrs) {
              // eslint-disable-next-line no-param-reassign
              node.attrs.isChecked = event.target.checked;
            }
            setValue(event.target.checked);
          }}
          checked={value}
        />
        {node
        && <PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />}
      </div>
      {/* <FormHelperText key={Math.floor(Math.random() * 1000 + 1)}>
    Must Be Checked</FormHelperText> */}
    </FormControl>
  );
}

export default PreviewValidationCheckbox;
