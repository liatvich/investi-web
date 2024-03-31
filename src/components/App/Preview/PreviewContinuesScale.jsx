/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';
import s from './PreviewContinuesScale.module.scss';
import { PreviewText } from './PreviewText';
import {
  Typography,
} from '@mui/material';

export function PreviewContinuesScale({ node, disabled }) {
  const [chosenValue, setChosenValue] = useState(0);

  useEffect(() => {
    if(node?.attrs?.chosenValue) {
      setChosenValue(node?.attrs?.chosenValue);
    }
  }, [node]);

  return (
    <div className={s.continues_slide}>
      <div className={s.top}>
        {node
          && <PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />}
      </div>
      <div className={s.on}>
            {node?.attrs?.minimumText && 
              <Typography
              // eslint-disable-next-line no-nested-ternary
                      variant={'body1'}
                      gutterBottom
                      component="span"
                      key={Math.floor(Math.random() * 1000 + 1)}
                    >
                      {node?.attrs?.minimumText || ' '}
                    </Typography>}
      <Slider defaultValue={50} value={chosenValue} disabled={disabled} 
       className={s.slider}
      onChange={(value)=>{
        setChosenValue(value);
        node.attrs.chosenValue = value;
      }}/>
            {node?.attrs?.maximumText && 
              <Typography
              // eslint-disable-next-line no-nested-ternary
                      variant={'body1'}
                      gutterBottom
                      component="span"
                      key={Math.floor(Math.random() * 1000 + 1)}
                    >
                      {node?.attrs?.maximumText || ' '}
                    </Typography>}
    </div>
    </div>
  );
}

export default PreviewContinuesScale;
