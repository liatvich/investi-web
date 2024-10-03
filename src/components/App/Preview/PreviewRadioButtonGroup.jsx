/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';
import s from './PreviewRadioButtonGroup.module.scss';
import { PreviewText } from './PreviewText';


export function PreviewRadioButtonGroup({ node, disabled, onChange }) {
  const [chosenValue, setChosenValue] = useState('');

  useEffect(() => {
    setChosenValue(node?.attrs?.chosenValue);
  }, [node]);

  const changeValue = (value) => {
    setChosenValue(value);
    node.attrs.chosenValue = value;
    onChange?.(value);
  };

  return (
        <Radio.Group
          name="controlled-radio-buttons-group"
          value={chosenValue}
          onChange={(event) => changeValue(event.target.value)}
          className={s.group}
        >
          {node?.content?.map((item, index) => (
            <Radio
              value={index}
              disabled={disabled}
              key={Math.floor(Math.random() * 1000 + 1)}
              className={s.item}
              onClick={() => {
                if(index === chosenValue) {
                  changeValue(null);
                }
              }}
            >
              {/* <Typography
        // eslint-disable-next-line no-nested-ternary
                variant={'body1'}
                gutterBottom
                component="span"
                key={Math.floor(Math.random() * 1000 + 1)}
              > */}
              <PreviewText node={item} />
                {/* {item?.content?.[0]?.text || ''} */}
              {/* </Typography> */}
            </Radio>
          ))}
      </Radio.Group>
  );
}

export default PreviewRadioButtonGroup;
