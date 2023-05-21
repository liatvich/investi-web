/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/*  eslint-disable-next-line react/prop-types  */

import React, { useState, useEffect } from 'react';
import {
  Typography,
  IconButton,
  Button,
  TextField,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import GroupsIcon from '@mui/icons-material/Groups';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { styled } from '@mui/material/styles';
import s from './Research.module.scss';
import { TextFieldMuiStyle } from '../../common/styleConsts';

const CssTextField = styled(TextField)(TextFieldMuiStyle);

export function Research({
  research, back, participantsSelected, startResearch, saveResearchAsDraft,
}) {
  const getResearchStage = () => {
    if (research.status === 'published') return 'not started';
    if (research.status === 'started') return 'started';
    return '';
  };

  const [currentResearch, setResearch] = useState(research);
  const [currentDescription, setDescription] = useState(currentResearch?.description || '');
  useEffect(() => {
    setResearch(research);
  }, [research]);

  return (
    <div className={s.root}>
      <div className={s.innerContent}>
        <div className={s.titleSection}>
          <div className={s.back}>
            <IconButton disableRipple onClick={back}>
              <KeyboardBackspaceIcon sx={{ color: '#104C43' }} />
            </IconButton>
            <Typography variant="h5" component="div" className={s.title}>
              {currentResearch?.title}
            </Typography>
          </div>
          {currentResearch?.status === 'published' && (
          <Button disableRipple className={s.create} onClick={() => startResearch(currentResearch)}>
            Start Research
          </Button>
          )}
        </div>
        <div className={s.content}>
          <Typography variant="h4" gutterBottom component="div" className={s.title}>
            {currentResearch?.title}
            {', '}
            {getResearchStage()}
            {', '}
            {currentResearch?.signups || '0'}
            {' '}
            participants
          </Typography>
          <Typography variant="h5" gutterBottom component="div" className={s.description}>
            Research Id:
            {' '}
            {currentResearch?.id}
          </Typography>
          <Typography variant="h5" gutterBottom component="div" className={s.description}>
            Research Type: Photo Upload
            <Typography variant="h5" gutterBottom component="div" className={s.note}>
              (We will have more types in the future :) stay tuned!)
            </Typography>
          </Typography>
          <div>
            <Typography variant="h5" gutterBottom component="div" className={s.description}>
              Description of the images you want to collect:
              <Typography variant="h5" gutterBottom component="div" className={s.note}>
                (This is the description that will be shown to the participants)
              </Typography>
              <CssTextField
                id="standard-multiline-static"
                multiline
                rows={4}
                value={currentDescription}
                onChange={(e) => setDescription(e.target.value)}
                className={s.descriptionInput}
                disabled={currentResearch?.status === 'started'}
              />
            </Typography>
          </div>

          {currentResearch?.signups && currentResearch?.signups > 0 ? (
            <>
              <div className={s.participants}>
                <Typography variant="h5" gutterBottom component="div" className={s.text}>
                  Go To Participants List:
                </Typography>
                <IconButton
                  className={s.actions}
                  onClick={() => {
                    participantsSelected({
                      participants: currentResearch?.actionsData?.participantsData,
                      researchTitle: currentResearch?.researchTitle,
                    });
                  }}
                >
                  <GroupsIcon />
                </IconButton>
              </div>
              <div className={s.participants}>
                <Typography variant="h5" gutterBottom component="div" className={s.text}>
                  Download Participants Images:
                </Typography>
                <IconButton
                  className={s.actions}
                >
                  <CloudDownloadIcon />
                </IconButton>
              </div>
            </>
          )
            : (
              <div className={s.participants}>
                <Typography variant="h5" gutterBottom component="div" className={s.text}>
                  No participants yet
                </Typography>
              </div>
            )}

          {currentResearch?.status === 'published' && (
            <div className={s.rootAction}>
              <Button
                disableRipple
                size="large"
                className={s.start}
                disabled={currentDescription === ''}
                onClick={() => startResearch(currentResearch, currentDescription)}
              >
                Start Research
              </Button>
              <Button disableRipple size="large" className={s.draft} onClick={() => saveResearchAsDraft(currentResearch, currentDescription)}>
                Save As Draft
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Research;
