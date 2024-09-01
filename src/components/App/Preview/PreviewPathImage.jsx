import React from 'react';
import s from './PreviewPathImage.module.scss';
/* eslint-disable react/prop-types */

const convertCssToObject = value => {
    const regex = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g, o = {};
    value.replace(regex, (m,p,v) => o[p] = v);
    return o;
  }

export function PreviewPathImage({ node }) {
    const cssInObject = convertCssToObject(node?.attrs?.style);
    return (<div >
      <img className={s.image} src={node?.attrs?.src} alt="img" style={cssInObject} /> 
    </div>)
};
  
// UPLOADING IMAGES FROM GOOGLE DRIVE
// https://lh3.google.com/u/0/d/1QT3qAX7oijefpqydYpIeyHKrqxyXZarp=w3024-h1646-iv1
// https://lh3.googleusercontent.com/d/1QT3qAX7oijefpqydYpIeyHKrqxyXZarp=w1000

// https://lh3.google.com/u/0/d/1ylp2iwhzYSklZEDkyX-E09xbOSFQYgx8=w1830-h1646-iv1
// https://lh3.googleusercontent.com/d/1ylp2iwhzYSklZEDkyX-E09xbOSFQYgx8=w1000

// https://lh3.google.com/u/0/d/1azjt-egVeaebhhMypQEiNqVWL7tBlcAg=w1830-h1646-iv1
// https://lh3.googleusercontent.com/d/1azjt-egVeaebhhMypQEiNqVWL7tBlcAg=w1000