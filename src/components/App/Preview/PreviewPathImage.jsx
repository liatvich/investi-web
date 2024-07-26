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
  