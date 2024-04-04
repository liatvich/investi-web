/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import s from './PreviewReadText.module.scss';
import { PreviewText } from './PreviewText';
import { ScanOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { Upload } from 'antd';
import Tesseract from 'tesseract.js';

export function PreviewReadText({ node, disabled }) {
  const [value, setValue] = useState(node?.attrs?.value);
  const [currDisabled, setCurrDisabled] = useState(disabled);

  const handleImageUpload = async (event) => {
    setCurrDisabled(true);
try {
    if (event?.target?.files?.[0]) {
      const result = await Tesseract.recognize(URL.createObjectURL(event.target.files[0]), 'eng');
      setValue(result?.data?.text);
      // eslint-disable-next-line no-param-reassign
      if (node?.attrs) {
        // eslint-disable-next-line no-param-reassign
        node.attrs.value = event.target.value;
      }
    }} catch (error) {
      console.error(error);
    } finally {
    setCurrDisabled(false);
  }
  };

  useEffect(() => {
    setValue(node?.attrs?.value);
  }, [node]);

  return (
    <>
      {node
        && <div className={s.top}><PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} /></div>}
                <div className={s.textAndScan}>
          <Input         
          placeholder={node?.attrs?.placeholder}
          value={value}
          className={s.textbox}
          disabled={disabled}
          onChange={(event) => {
            // eslint-disable-next-line no-param-reassign
            if (node?.attrs) {
              // eslint-disable-next-line no-param-reassign
              node.attrs.value = event.target.value;
            }
            setValue(event.target.value);
        }}></Input>
          <Button icon={currDisabled ? <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />}/> 
          : <ScanOutlined/>} disabled={currDisabled} tabIndex={-1} role={undefined} onClick={(e)=>{
              document.getElementById('fileInput').click();
          }}>
          </Button>
          <Upload
            listType="picture"
            maxCount={1}
            onChange={onImageChange}
            id="fileInput"
            style={{display: 'none'}}
          />
          {/* <input type="file" accept="image/*" onChange={handleImageUpload}  id="fileInput" style={{display: 'none'}}/> */}
         </div>
    </>
  );
}
