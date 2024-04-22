/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';
import s from './PreviewRadioButtonGroup.module.scss';
import {
  Typography,
} from '@mui/material';
import { PreviewText } from './PreviewText';


export function PreviewRadioButtonGroup({ node, disabled, onChange }) {
  const [chosenValue, setChosenValue] = useState('');

  useEffect(() => {
    setChosenValue(node?.attrs?.chosenValue);
  }, [node]);

  return (
        <Radio.Group
          name="controlled-radio-buttons-group"
          value={chosenValue}
          onChange={(event) => {
            setChosenValue(event.target.value);
            // eslint-disable-next-line no-param-reassign
            node.attrs.chosenValue = event.target.value;
            onChange?.(event.target.value);
          }}
          className={s.group}
        >
          {node?.content?.map((item, index) => (
            <Radio
              value={index}
              disabled={disabled}
              key={Math.floor(Math.random() * 1000 + 1)}
              className={s.item}
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
