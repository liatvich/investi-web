/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { IconButton, Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PreviewParser } from './PreviewParser';
import s from './ResearchPreview.module.scss';
import { EDITOR_ELEMENTS_TYPES } from '../../../common/consts';
import { Logo } from '../../Logo';
import { ResearchPreviewMobile } from './ResearchPreviewMobile';

const IconRoundButton = styled(IconButton)({
  width: '184px',
  height: '184px',
  background: 'rgba(16, 76, 67, 0.1)',
  alignSelf: 'center',
});

const ArrowIconStyle = {
  width: '40px',
  height: '25px',
  color: '#2C3D8F',
};

// isConsumer - SUPER UGLY!
export function ResearchPreview({
  research, isConsumer, submitOnClick, title, participantId, researchId, managerId, email, conditionChanged, fillAnotherResearch, submitText
}) {
  const [currPage, setCurrPage] = useState(0);
  const [isSubmittedExperiment, setIsSubmittedExperiment] = useState(false);

  const isCheckboxValid = () => {
    const isValid = research[currPage]?.content
      ?.filter((node) => node?.type
    === EDITOR_ELEMENTS_TYPES.VALIDATION_CHECKBOX && node?.attrs?.isChecked === false)
      .length === 0;

    return isValid;
  };

  const calculateScore = () => {
    if (!research || typeof research !== 'object') {
      console.warn('Invalid research data');
      return 0;
    }

    try {
      return Object.values(research).reduce((totalScore, page, index) => {
        if (!page || !Array.isArray(page.content)) {
          return totalScore;
        }

        const flattenedContent = page.content.reduce((acc, node) => {
          if (node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP && node.attrs?.chosenValue !== "") {
            node.content[node.attrs.chosenValue].attrs.value = true;
            acc.push(...node.content);
          } else {
            acc.push(node);
          }
          return acc;
        }, []);

        const pageScore = flattenedContent
          .filter(node => 
            node && 
            typeof node === 'object' && 
            (node.type === EDITOR_ELEMENTS_TYPES.CHECKBOX_SCORE || node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_SCORE) && 
            node.attrs && 
            node.attrs.value === true
          )
          .reduce((acc, node) => {
            const nodeScore = parseFloat(node.attrs.score);
            return acc + (Number.isFinite(nodeScore) ? nodeScore : 0);
          }, 0);

        return totalScore + pageScore;
      }, 0);
    } catch (error) {
      console.error('Error calculating score:', error);
      return 0;
    }
  };

  const researchView = () => {
    return (research ? (
      <PreviewParser
        researchData={research[currPage]}
        participantId={participantId}
        researchId={researchId}
        managerId={managerId}
        conditionChanged={conditionChanged}
      />
    ) : <div>Empty</div>);
    };

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
          {currPage + 1}
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
        {currPage > 0 ? (
          <IconRoundButton
            disableRipple
            onClick={() => {
              setCurrPage(currPage - 1);
            }}
          >
            <ArrowBackIosIcon sx={ArrowIconStyle} />
          </IconRoundButton>
        ) : <div />}
        <div className={s.preview}>
          {Header}
          {researchView()}
          {
            isConsumer
            && (currPage + 1) === Object.keys(research).length
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
          ) : <div />}
      </div>
    </div>
  );

  const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

  return (
    <>
      {
        // eslint-disable-next-line no-nested-ternary
        isMobile ? (
          <ResearchPreviewMobile
            research={research}
            submitOnClick={async (filledResearch) => {await submitOnClick(filledResearch);}}
            title={title}
            submitText={submitText}
            participantId={participantId}
            researchId={researchId}
            managerId={managerId}
            conditionChanged={conditionChanged}
            fillAnotherResearch={fillAnotherResearch}
          />
        )
          : isSubmittedExperiment ? (
            <div className={s.submitted}>
              <Logo />
              <div className={s.content}>
                <CheckCircleIcon sx={{
                  width: '165px',
                  height: '162px',
                  color: '#2C3D8F',
                  marginBottom: '62px',
                }}
                />
                <Typography variant="subtitle1" component="div" className={s.text}>
                  Success your application was sent!
                </Typography>
                {submitText && (
                  <Typography variant="subtitle1" component="div" className={s.score}>
                    {submitText + ' Score: ' + calculateScore()}
                  </Typography>
                )}
                <Button
                disableRipple
                onClick={() => {
                  fillAnotherResearch();
                  setCurrPage(0);
                  setIsSubmittedExperiment(false);
                  }
                }
              >
                {'Fill the next application'}
              </Button>
              </div>
            </div>
          ) : (preview)
}
    </>
  );
}

export default ResearchPreview;
