/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import {
  FormControl, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';

export function PreviewRadioButtonGroup({ node, disabled }) {
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
          {node?.content?.map((item, index) => (
            <FormControlLabel
              value={index}
              control={<Radio />}
              label={item?.content?.[0]?.text || ''}
              disabled={disabled}
              key={Math.floor(Math.random() * 1000 + 1)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </FormControl>
  );
}

export default PreviewRadioButtonGroup;
