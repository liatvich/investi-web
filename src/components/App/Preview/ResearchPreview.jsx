/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import debounce from 'lodash.debounce';
import { PreviewParser } from './PreviewParser';
import s from './ResearchPreview.module.scss';
import { EDITOR_ELEMENTS_TYPES } from '../../../services/consts';

// isConsumer - SUPER UGLY!
export function ResearchPreview({ research, isConsumer, submitOnClick }) {
  const [currPage, setCurrPage] = useState(1);
  const [email, setEmail] = useState('');
  const [showEmailValidationError, setShowEmailValidationError] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const isCheckboxValid = () => {
    const isValid = research[currPage]?.content
      ?.filter((node) => node?.type
    === EDITOR_ELEMENTS_TYPES.VALIDATION_CHECKBOX && node?.attrs?.isChecked === false)
      .length === 0;

    setValidationError(!isValid);
    return isValid;
  };

  const emailValidation = (checkEmail) => String(checkEmail).toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

  const handleEmailValidationChange = (value) => {
    if (emailValidation(value)) {
      setShowEmailValidationError(false);
    } else {
      setShowEmailValidationError(true);
    }
  };

  const onChangeMailValidation = useCallback(debounce(handleEmailValidationChange, 250), []);

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
      <>
        <div>
          <Typography variant="body1" gutterBottom component="div">
            To register please enter your mail:
          </Typography>
          <TextField
            id="standard-error"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              // handleEmailValidationChange(event.target.value);
              onChangeMailValidation(event.target.value);
            }}
            placeholder="Please enter your email"
            error={showEmailValidationError}
          />
        </div>
        <Button
          onClick={() => {
            if (isCheckboxValid()) {
              submitOnClick(email, research);
            }
          }}
          disabled={email === '' || showEmailValidationError}
        >
          Submit Application
        </Button>
      </>
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
