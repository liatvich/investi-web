/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/*  eslint-disable-next-line react/prop-types  */

import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
  Typography,
  IconButton,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import GroupsIcon from '@mui/icons-material/Groups';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {
  getStorage, ref, listAll, getMetadata, getDownloadURL,
} from 'firebase/storage';
// import { styled } from '@mui/material/styles';
import s from './Research.module.scss';
// import { TextFieldMuiStyle } from '../../common/styleConsts';

// const CssTextField = styled(TextField)(TextFieldMuiStyle);

export const downloadFolderAsZip = async (path) => {
  const jszip = new JSZip();
  const storage = getStorage();
  const folderRef = ref(
    storage,
    path,
  );
  const folder = await listAll(folderRef);
  const participantFolders = folder.prefixes;

  // eslint-disable-next-line no-restricted-syntax
  // for (const participantFolder of participantFolders) {
  // eslint-disable-next-line max-len
  const innerFolders = await Promise.all(participantFolders.map(async (participantFolder) => listAll(participantFolder)));
  const allItems = innerFolders.reduce((acc, curr) => [...acc, ...curr.items], []);

  const promises = allItems
    .map(async (item) => {
      const file = await getMetadata(item);
      const fileRef = ref(storage, item.fullPath);
      const fileBlob = await getDownloadURL(fileRef)
        .then((url) => fetch(url).then((response) => response.blob()))
        .catch((error) => { console.log(error); });
      jszip.file(file.name, fileBlob);
    })
    .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());
  await promises;
  const blob = await jszip.generateAsync({ type: 'blob' });
  saveAs(blob, 'download.zip');
};

export function Research({
  research, back, participantsSelected, // startResearch, // saveResearchAsDraft,
}) {
  // const getResearchStage = () => {
  //   if (research.status === 'published') return 'not started';
  //   if (research.status === 'started') return 'started';
  //   return '';
  // };

  const [currentResearch, setResearch] = useState(research);
  // const [currentDescription, setDescription] = useState(currentResearch?.description || '');
  useEffect(() => {
    setResearch(research);
  }, [research]);

  return (
    <div className={s.root}>
      <div className={s.innerContent}>
        <div className={s.titleSection}>
          <div className={s.back}>
            <IconButton disableRipple onClick={back}>
              <KeyboardBackspaceIcon sx={{ color: '#2C3D8F' }} />
            </IconButton>
            <Typography variant="h5" component="div" className={s.title}>
              {currentResearch?.title}
            </Typography>
          </div>
          {/* {currentResearch?.status === 'published' && (
          <Button disableRipple className={s.create} onClick={() => startResearch(currentResearch)}>
            Start Research
          </Button>
          )} */}
        </div>
        <div className={s.content}>
          <Typography variant="h4" gutterBottom component="div" className={s.title}>
            {currentResearch?.title}
            {', '}
            {/* {getResearchStage()}
            {', '} */}
            {currentResearch?.signups || '0'}
            {' '}
            participants
          </Typography>
          <Typography variant="h5" gutterBottom component="div" className={s.description}>
            Research Id:
            {' '}
            {currentResearch?.id}
          </Typography>

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
                  onClick={() => {
                    downloadFolderAsZip(`images/${research?.user_id}/${research?.id}`);
                  }}
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

          {/* {currentResearch?.status === 'published' && (
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
              <Button disableRipple size="large"
              className={s.draft}
              onClick={() => saveResearchAsDraft(currentResearch, currentDescription)}>
                Save As Draft
              </Button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Research;
