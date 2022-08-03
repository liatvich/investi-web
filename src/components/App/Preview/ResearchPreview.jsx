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
import s from './ResearchPreview.module.scss';
import { EDITOR_ELEMENTS_TYPES } from '../../../common/consts';
import { Logo } from '../../Logo';

const IconRoundButton = styled(IconButton)({
  width: '184px',
  height: '184px',
  background: 'rgba(16, 76, 67, 0.1)',
  alignSelf: 'center',
});

const ArrowIconStyle = {
  width: '40px',
  height: '25px',
  color: '#104C43',
};

// isConsumer - SUPER UGLY!
export function ResearchPreview({
  research, isConsumer, submitOnClick, title,
}) {
  const [currPage, setCurrPage] = useState(1);
  const [validationError, setValidationError] = useState(false);
  const [isSubmittedExperiment, setIsSubmittedExperiment] = useState(false);

  const isCheckboxValid = () => {
    const isValid = research[currPage]?.content
      ?.filter((node) => node?.type
    === EDITOR_ELEMENTS_TYPES.VALIDATION_CHECKBOX && node?.attrs?.isChecked === false)
      .length === 0;

    setValidationError(!isValid);
    return isValid;
  };

  const styles = {

  };

  const researchView = () => (
    research ? (
      <PreviewParser
        researchData={research[currPage]}
      />
    ) : <div>Empty</div>
  );

  const Header = (
    <div className={s.header}>
      <div className={s.name}>
        <Typography variant="subtitle1" component="div" className={s.title}>
          Research Name
        </Typography>
        <Typography variant="subtitle1" component="div" className={s.experiment}>
          {title}
        </Typography>
      </div>
      <div className={s.pages}>
        <Typography variant="subtitle1" component="div" className={s.text}>
          Pages
          {' '}
          {currPage}
          /
          {Object.keys(research).length}
        </Typography>
      </div>
    </div>
  );

  const preview = (
    <div className={s.main}>
      <Logo />
      <div className={s.content}>
        {currPage > 1 ? (
          <IconRoundButton
            disableRipple
            onClick={() => {
              setCurrPage(currPage - 1);
            }}
            classes={styles}
          >
            <ArrowBackIosIcon sx={ArrowIconStyle} />
          </IconRoundButton>
        ) : <div />}
        <div className={s.preview}>
          {Header}
          {researchView()}
          {
            isConsumer
            && currPage === Object.keys(research).length
              && (
                <div className={s.submit}>
                  <Typography variant="subtitle1" component="div" className={s.text}>
                    To finish your application click in the subscribe button
                  </Typography>
                  <Button
                    disableRipple
                    onClick={() => {
                      if (isCheckboxValid()) {
                        submitOnClick(research);
                        setIsSubmittedExperiment(true);
                      }
                    }}
                    sx={{
                      background: '#104C43',
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
              )
          }
        </div>
        {currPage < Object.keys(research).length
          ? (
            <IconRoundButton
              disableRipple
              onClick={() => {
                if (isCheckboxValid()) {
                  setCurrPage(currPage + 1);
                }
              }}
              classes={styles}
            >
              <ArrowForwardIosIcon sx={ArrowIconStyle} />
            </IconRoundButton>
          ) : <div />}
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
              width: '165px',
              height: '162px',
              color: '#104C43',
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

// { /*
//         {validationError
//               && (
//               <Typography variant="h5" gutterBottom component="div">
//                 Please Check requested checkboxes
//               </Typography>
//               )}
//       </div> */ }

export default ResearchPreview;
