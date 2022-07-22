/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PreviewParser } from './PreviewParser';
import s from './ResearchPreview.module.scss';
import { EDITOR_ELEMENTS_TYPES } from '../../../common/consts';

// isConsumer - SUPER UGLY!
export function ResearchPreview({ research, isConsumer, submitOnClick }) {
  const [currPage, setCurrPage] = useState(1);
  const [validationError, setValidationError] = useState(false);

  const isCheckboxValid = () => {
    const isValid = research[currPage]?.content
      ?.filter((node) => node?.type
    === EDITOR_ELEMENTS_TYPES.VALIDATION_CHECKBOX && node?.attrs?.isChecked === false)
      .length === 0;

    setValidationError(!isValid);
    return isValid;
  };

  const researchView = () => (
    research ? (
      <PreviewParser
        researchData={research[currPage]}
      />
    ) : <div>Empty</div>
  );

  return (
    <div className={s.main}>
      {researchView()}
      <div>
        {currPage > 1 && (
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            setCurrPage(currPage - 1);
          }}
        >
          prev
        </Button>
        )}
        {currPage < Object.keys(research).length
&& (
<Button
  startIcon={<ArrowForwardIcon />}
  onClick={() => {
    if (isCheckboxValid()) {
      setCurrPage(currPage + 1);
    }
  }}
>
  next
</Button>
)}
        {
  isConsumer
  && currPage === Object.keys(research).length
    && (
    <Button
      onClick={() => {
        if (isCheckboxValid()) {
          submitOnClick(research);
        }
      }}
    >
      Submit Application
    </Button>
    )
}
        {validationError
              && (
              <Typography variant="h5" gutterBottom component="div">
                Please Check requested checkboxes
              </Typography>
              )}
      </div>
    </div>
  );
}

export default ResearchPreview;
