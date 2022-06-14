/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PreviewParser } from './PreviewParser';
import s from './ResearchPreview.module.scss';

export function ResearchPreview({ research }) {
  const [checkedCheckboxes, setCheckboxesState] = useState([]);
  const [validationError, setValidationError] = useState(false);

  const checkBoxClick = (checked, index) => {
    setCheckboxesState((prevCheckedCheckboxes) => {
      prevCheckedCheckboxes[index] = checked;
      return prevCheckedCheckboxes;
    });
  };

  useEffect(() => {
    if (research?.content) {
      const checkboxesCount = research?.content?.filter(
        (node) => node.type === 'validationCheckbox',
      ).length;
      // eslint-disable-next-line no-plusplus
      const validationCheckboxes = {};
      for (let index = 0; index < checkboxesCount; index += 1) {
        validationCheckboxes[index.toString()] = false;
      }
      setCheckboxesState(validationCheckboxes);
    }
  }, [research]);

  const researchView = () => (
    research ? (
      <PreviewParser
        researchData={research}
        checkBoxClick={checkBoxClick}
      />
    ) : <div>Empty</div>
  );

  return (
    <div className={s.main}>
      {researchView()}
      <div>
        <Button
          startIcon={<ArrowBackIcon />}
        >
          prev
        </Button>
        <Button
          startIcon={<ArrowForwardIcon />}
          onClick={() => {
            // if (checkedValidationCount > 0) {
            setValidationError(() => Object.keys(checkedCheckboxes)
              .filter((index) => !checkedCheckboxes[index]).length > 0);
            // } else
          }}
        >
          next
        </Button>
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
