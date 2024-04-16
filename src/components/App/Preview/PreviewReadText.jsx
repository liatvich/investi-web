/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import s from './PreviewReadText.module.scss';
import { PreviewText } from './PreviewText';
import { ScanOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import Tesseract from 'tesseract.js';

export function PreviewReadText({ node, disabled }) {
  const [value, setValue] = useState(node?.attrs?.value);
  const [currDisabled, setCurrDisabled] = useState(disabled);


  async function imageProcess(file){
    // Load image and convert it to an image object
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    // Wait for the image to load
    await new Promise(resolve => {
      img.onload = resolve;
    });
  
    // Create a canvas to draw the enlarged image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    const upscaleBy = 2
    // Enlarge the image by doubling its size
    canvas.width = img.width * upscaleBy;
    canvas.height = img.height * upscaleBy;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
    // Convert canvas to Blob object
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 1));
  
    // Use Tesseract.js to recognize the text in the enlarged image
    const result = await Tesseract.recognize(blob, 'eng');
    const text = result?.data?.text;
    
    return text;
  }


  const handleImageUpload = async (event) => {
    setCurrDisabled(true);
try {
    if (event?.target?.files?.[0]) {
      const text = await imageProcess(event.target.files[0])
      setValue(text);
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
          <input type="file" accept="image/*" onChange={handleImageUpload}  id="fileInput" style={{display: 'none'}}/>
         </div>
    </>
  );
}
