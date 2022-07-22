/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Typography,
} from '@mui/material';
import { EDITOR_ELEMENTS_TYPES } from '../../../common/consts';

export function PreviewText({ node }) {
  return (
    <div key={Math.floor(Math.random() * 1000 + 1)}>
      {node?.content?.filter((content) => content?.type === EDITOR_ELEMENTS_TYPES.TEXT
      || content?.type === EDITOR_ELEMENTS_TYPES.HARD_BREAK)
        .map((content) => {
          if (content?.type === EDITOR_ELEMENTS_TYPES.TEXT) {
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
          return <br key={Math.floor(Math.random() * 1000 + 1)} />;
        })}
    </div>
  );
}

export default PreviewText;
