/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Typography,
  Link,
} from '@mui/material';
import { EDITOR_ELEMENTS_TYPES } from '../../../common/consts';
import {PreviewPathImage } from './PreviewPathImage';
import {PreviewDatePicker} from './PreviewDatePicker';
import s from './PreviewText.module.scss'


export function PreviewText({ node, disabled }) {
  return (
    <div key={Math.floor(Math.random() * 1000 + 1)} className={s.section}>
      {node?.content?.filter((content) => content?.type === EDITOR_ELEMENTS_TYPES.TEXT
      || content?.type === EDITOR_ELEMENTS_TYPES.HARD_BREAK || content?.type === EDITOR_ELEMENTS_TYPES.IMAGE  || content?.type ===  EDITOR_ELEMENTS_TYPES.DATE_PICKER)
        .map((content) => {
          if (content?.type === EDITOR_ELEMENTS_TYPES.TEXT) {
            let attributes;
            let type = 'text';
            if(content?.marks?.length > 0) {
              if (content?.marks?.[0]?.type === 'link') {
                type = 'link';
              }
              attributes = content?.marks?.[0]?.attrs;
            }  
            if(type === 'link' && !!(attributes)) {
              return (<Link 
              variant={node?.attrs?.level ? (node?.attrs?.level === 1 ? 'h4' : 'h5') : 'body1'}
              gutterBottom
              key={Math.floor(Math.random() * 1000 + 1)}
              {...attributes}
              >
              {content.text || ' '}
              </Link>);
            }
            return (
              <Typography
        // eslint-disable-next-line no-nested-ternary
                variant={node?.attrs?.level ? (node?.attrs?.level === 1 ? 'h4' : 'h5') : 'body1'}
                gutterBottom
                component="span"
                key={Math.floor(Math.random() * 1000 + 1)}
              >
                {content.text || ' '}
              </Typography>
            );
          }
          if (content?.type === EDITOR_ELEMENTS_TYPES.IMAGE) {
            return (
                <PreviewPathImage
                  key={Math.floor(Math.random() * 1000 + 1)}
                  node={content}
                />
            );
          } if (content?.type === EDITOR_ELEMENTS_TYPES.DATE_PICKER) {
            return (<PreviewDatePicker
              node={content}
              disabled={disabled}
              key={Math.floor(Math.random() * 1000 + 1)}
            />);
          }
          return <br key={Math.floor(Math.random() * 1000 + 1)} />;
        })}
    </div>
  );
}

export default PreviewText;
