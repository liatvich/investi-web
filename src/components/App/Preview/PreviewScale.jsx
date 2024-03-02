/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import {
  FormControl, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
import s from './PreviewScale.module.scss';

export function PreviewScale({ node, disabled }) {
  const [chosenValue, setChosenValue] = useState(0);

  useEffect(() => {
    setChosenValue(node?.attrs?.chosenValue);
  }, [node]);

  return (
    <FormControl
      key={Math.floor(Math.random() * 1000 + 1)}
      required
      component="fieldset"
      variant="standard"
    >
      <FormControl>
        <RadioGroup
          name="controlled-radio-buttons-group"
          value={chosenValue}
          onChange={(event) => {
            setChosenValue(event.target.value);
            // eslint-disable-next-line no-param-reassign
            node.attrs.chosenValue = event.target.value;
          }}
        >
          <div className={s.scale_ratio_button}>
            {[1, 2, 3, 4, 5].map((item) => (
              <FormControlLabel
                value={item}
                control={<Radio />}
                label={item.toString()}
                disabled={disabled}
                key={Math.floor(Math.random() * 1000 + 1)}
              />
            ))}
          </div>
        </RadioGroup>
      </FormControl>
    </FormControl>
  );
}

export default PreviewScale;
