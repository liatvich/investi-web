/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NodeViewWrapper } from '@tiptap/react'; // NodeViewContent
import './DatePicker.scss';
import { DatePicker as DatePickerComponent } from "antd";

function DatePicker({node, updateAttributes}) {
  return (
    <NodeViewWrapper className={'datePicker'}>
            <div  contentEditable="true" className={'datePicker'} >
    <DatePickerComponent 
                disabled={true}
    />
      </div>
    </NodeViewWrapper>
  );
}

export default DatePicker;
