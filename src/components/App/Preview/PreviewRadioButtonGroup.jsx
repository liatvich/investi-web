/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';
import s from './PreviewRadioButtonGroup.module.scss';
import { PreviewText } from './PreviewText';


export function PreviewRadioButtonGroup({ node, disabled, onChange }) {
  const [chosenValue, setChosenValue] = useState(null);

  useEffect(() => {
    setChosenValue(node?.attrs?.chosenValue ?? null);
  }, [node]);

  const changeValue = (value) => {
    const newValue = value === chosenValue ? null : value;
    setChosenValue(newValue);
    if (node.attrs) {
      node.attrs.chosenValue = newValue;
    }
    onChange?.(newValue);
  };

  return (
    <Radio.Group
      name="controlled-radio-buttons-group"
      value={chosenValue}
      className={s.group}
    >
      {node?.content?.map((item, index) => (
        <Radio
          value={index}
          disabled={disabled}
          key={`radio-${index}`}
          className={s.item}
          onClick={() => changeValue(index)}
        >
          <PreviewText node={item} />
        </Radio>
      ))}
    </Radio.Group>
  );
}

export default PreviewRadioButtonGroup;
