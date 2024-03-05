/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';
import s from './PreviewContinuesScale.module.scss';
import { PreviewText } from './PreviewText';

export function PreviewContinuesScale({ node, disabled }) {
  const [chosenValue, setChosenValue] = useState(0);

  useEffect(() => {
    if(node?.attrs?.chosenValue) {
      setChosenValue(node?.attrs?.chosenValue);
    }
  }, [node]);

  return (
    <div className={s.continues_slide}>
            {node
        && <PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />}
      <Slider defaultValue={50} value={chosenValue} disabled={disabled} 
      onChange={(value)=>{
        setChosenValue(value);
        node.attrs.chosenValue = value;
      }}/>
    </div>
  );
}

export default PreviewContinuesScale;
