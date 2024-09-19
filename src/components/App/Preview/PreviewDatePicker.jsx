/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import s from './PreviewDatePicker.module.scss';
import { DatePicker } from "antd";
import dayjs from 'dayjs';

export function PreviewDatePicker({ node, disabled, key }) {
  const [chosenValue, setChosenValue] = useState(undefined) ;

  useEffect(() => {
    if(node?.attrs?.value) {
      const date = dayjs(node?.attrs?.value, 'MM/DD/YYYY');
      setChosenValue(date);
    }
  }, [node]);

  return (
    <DatePicker
                key={key}
                value={chosenValue}
                disabled={disabled}
                className={s.date_picker}
                onChange={(value)=>{
                  setChosenValue(value);
                  node.attrs.value =  dayjs(value).format('MM/DD/YYYY');
                }}
    />
  );
}

export default PreviewDatePicker;

