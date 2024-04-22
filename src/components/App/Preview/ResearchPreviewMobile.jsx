/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React, { useState } from 'react';
import { IconButton, Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PreviewParser } from './PreviewParser';
import s from './ResearchPreviewMobile.module.scss';
import { EDITOR_ELEMENTS_TYPES } from '../../../common/consts';
import { Logo } from '../../Logo';
import { EmailTextbox } from '../../EmailTextbox';
import { emailValidation } from '../../../common/general';

const IconRoundButton = styled(IconButton)({
  width: '24px',
  height: '24px',
  background: 'rgba(16, 76, 67, 0.1)',
  alignSelf: 'center',
});

const ArrowIconStyle = {
  width: '9px',
  height: '9px',
  color: '#2C3D8F',
};

export function ResearchPreviewMobile({
  research, submitOnClick, title, managerId, participantId, researchId, email, conditionChanged
}) {
  const [currPage, setCurrPage] = useState(0);
  // const [validationError, setValidationError] = useState(false);
  const [isSubmittedExperiment, setIsSubmittedExperiment] = useState(false);

  const isCheckboxValid = () => {
    const isValid = research[currPage]?.content
      ?.filter((node) => node?.type
    === EDITOR_ELEMENTS_TYPES.VALIDATION_CHECKBOX && node?.attrs?.isChecked === false)
      .length === 0;

    return isValid;
  };

  const researchView = () => (
    research ? (
      <PreviewParser
        researchData={research[currPage]}
        participantId={participantId}
        researchId={researchId}
        managerId={managerId}
        conditionChanged={conditionChanged}
      />
    ) : <div>Empty</div>
  );

  const Header = (
    <div className={s.header}>
      <div className={s.headerContent}>
        <div className={s.name}>
          <Typography variant="subtitle1" component="div" className={s.title}>
            Research Name
          </Typography>
          <Typography variant="subtitle1" component="div" className={s.experiment}>
            {title}
          </Typography>
        </div>
        <div className={s.pages}>
          {currPage > 0 ? (
            <IconRoundButton
              disableRipple
              onClick={() => {
                setCurrPage(currPage - 1);
              }}
            >
              <ArrowBackIosIcon sx={ArrowIconStyle} />
            </IconRoundButton>
          ) : <div className={s.spaceHolder} />}
          <Typography variant="subtitle1" component="div" className={s.text}>
            {currPage + 1}
            /
            {Object.keys(research).length}
          </Typography>
          {currPage + 1 < Object.keys(research).length
            ? (
              <IconRoundButton
                disableRipple
                onClick={() => {
                  if (isCheckboxValid()) {
                    setCurrPage(currPage + 1);
                  }
                }}
              >
                <ArrowForwardIosIcon sx={ArrowIconStyle} />
              </IconRoundButton>
            ) : <div className={s.spaceHolder} />}
        </div>
      </div>
    </div>
  );

  const preview = (
    <div className={s.content}>
      <div className={s.preview}>
        {Header}
        {researchView()}
        {
            (currPage + 1) === Object.keys(research).length
              && (
                <>
                  <div className={s.submit}>
                    <Typography variant="subtitle1" component="div" className={s.text}>
                      To finish your application click in the submit button
                    </Typography>
                    <Button
                      disableRipple
                      onClick={() => {
                        if (isCheckboxValid()) {
                          submitOnClick(research, email);
                          setIsSubmittedExperiment(true);
                        }
                      }}
                      sx={{
                        background: '#2C3D8F',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        '&:hover': {
                          background: '#1D8A7A',
                        },
                      }}
                    >
                      Submit Application
                    </Button>
                  </div>
                </>
              )
          }
      </div>
    </div>
  );

  return (
    <>
      {isSubmittedExperiment ? (
        <div className={s.submitted}>
          <Logo />
          <div className={s.content}>
            <CheckCircleIcon sx={{
              width: '96px',
              height: '96px',
              color: '#2C3D8F',
              marginBottom: '62px',
            }}
            />
            <Typography variant="subtitle1" component="div" className={s.text}>
              Success your application was sent!
            </Typography>
            <Typography variant="subtitle1" component="div" className={s.text}>
              You will get soon a mail with the experiment process.
            </Typography>
          </div>
        </div>
      ) : (preview)}
    </>
  );
}

export default ResearchPreviewMobile;
