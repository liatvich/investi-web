/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';
import s from './PreviewNumberInput.module.scss';
import { PreviewText } from './PreviewText';
import {
  Typography,
} from '@mui/material';

export function PreviewNumberInput({ node, disabled }) {
  const [chosenValue, setChosenValue] = useState(node?.attrs?.value || 0);
  const [minValue, setMinValue] = useState(node?.attrs?.minValue || 0);
  const [maxValue, setMaxValue] = useState(node?.attrs?.maxValue || 100);
  const [intervalValue, setIntervalValue] = useState(node?.attrs?.intervalValue || 1);

  useEffect(() => {
    if(node?.attrs?.chosenValue) {
      setChosenValue(node?.attrs?.chosenValue);
    }
  }, [node]);

  return (
    <div className={s.number_input}>
      <div className={s.top}>
        {node
          && <PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />}
      </div>
      <div className={s.on}>
            {node?.attrs?.prefixText && 
              <Typography
              // eslint-disable-next-line no-nested-ternary
                      variant={'body1'}
                      gutterBottom
                      component="span"
                      key={Math.floor(Math.random() * 1000 + 1)}
                    >
                      {node?.attrs?.prefixText || ' '}
                    </Typography>}
      <InputNumber value={chosenValue} disabled={disabled} 
                min={minValue} max={maxValue} step={intervalValue}
       className={s.slider}
      onChange={(value)=>{
        setChosenValue(value);
        node.attrs.value = value;
      }}/>
            {node?.attrs?.suffixText && 
              <Typography
              // eslint-disable-next-line no-nested-ternary
                      variant={'body1'}
                      gutterBottom
                      component="span"
                      key={Math.floor(Math.random() * 1000 + 1)}
                    >
                      {node?.attrs?.suffixText || ' '}
                    </Typography>}
    </div>
    </div>
  );
}

export default PreviewNumberInput;
