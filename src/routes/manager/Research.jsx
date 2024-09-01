/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/*  eslint-disable-next-line react/prop-types  */

import React, { useState, useEffect } from 'react';
// import JSZip from 'jszip';
// import { saveAs } from 'file-saver';
import {
  Typography,
  IconButton,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import GroupsIcon from '@mui/icons-material/Groups';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {EDITOR_ELEMENTS_TYPES} from '../../common/consts';
// import {
//   getStorage, ref, listAll, getMetadata, getDownloadURL,
// } from 'firebase/storage';
// import { styled } from '@mui/material/styles';
import s from './Research.module.scss';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import { saveAs } from 'file-saver';


// const ipAddressesData = [
//   {
//     id: "1",
//     name: "Sarajane Wheatman",
//     ip: "40.98.252.240"
//   },
//   {
//     id: "2",
//     name: "Linell Humpherston",
//     ip: "82.225.151.150"
//   }
// ]




export const downloadFolderAsZip = async (path) => {
  // CHANGE TO AMAZON S3
  // const jszip = new JSZip();
  // const storage = getStorage();
  // const folderRef = ref(
  //   storage,
  //   path,
  // );
  // const folder = await listAll(folderRef);
  // const participantFolders = folder.prefixes;

  // // eslint-disable-next-line no-restricted-syntax
  // // for (const participantFolder of participantFolders) {
  // // eslint-disable-next-line max-len
  // const innerFolders = await Promise.all(participantFolders.map(async (participantFolder) => listAll(participantFolder)));
  // const allItems = innerFolders.reduce((acc, curr) => [...acc, ...curr.items], []);

  // const promises = allItems
  //   .map(async (item) => {
  //     const file = await getMetadata(item);
  //     const fileRef = ref(storage, item.fullPath);
  //     const fileBlob = await getDownloadURL(fileRef)
  //       .then((url) => fetch(url).then((response) => response.blob()))
  //       .catch((error) => { console.log(error); });
  //     jszip.file(file.name, fileBlob);
  //   })
  //   .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());
  // await promises;
  // const blob = await jszip.generateAsync({ type: 'blob' });
  // saveAs(blob, 'download.zip');
};

export function Research({
  research, back, participantsSelected, activeResearch // startResearch, // saveResearchAsDraft,
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


  const convertFilledDataToSvg = (filledData) => {
    // I need to add logic of text - paragraph or text inside the component
    const allPagesData = Object.values(filledData).reduce((content, page) => {
      content = [...content, ...page.content];
      return content;
    },[]);

    console.log('allPagesData', allPagesData);

    const svgData = {};

    // NOTE: how am I doing my 
    allPagesData.forEach((content, index) => {
      if(content.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP) {
        if (allPagesData[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
          const title = allPagesData[index - 1]?.content?.[0].text?.trim().replace(/\s/g, '_');
          const chosen = content?.attrs?.chosenValue;
          if (title && chosen) {
            svgData[title] = content?.content?.[chosen]?.content?.[0].text;
        }
      }
      } 
      if (content.type === EDITOR_ELEMENTS_TYPES.TEXTBOX || content.type === EDITOR_ELEMENTS_TYPES.TEXTAREA) {
        if (allPagesData[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
          const title = allPagesData[index - 1]?.content?.[0].text?.trim().replace(/\s/g, '_');
          if (title) {
            svgData[title] = content?.attrs?.value;
          }
        }
      }
      if (content.type === EDITOR_ELEMENTS_TYPES.IMAGE_UPLOADER) {
        console.log('IMAGE_UPLOADER - content', content);
        let title = 'Uploaded Image';
        if (allPagesData[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
           title = allPagesData[index - 1]?.content?.[0].text?.trim().replace(/\s/g, '_'); 
        }
        svgData[title] = content?.attrs?.value;

      }
      // if (content.type === EDITOR_ELEMENTS_TYPES.SCALE_CONTINUES) {
      //   // set her the chosen value
      // }
      // if (content.type === EDITOR_ELEMENTS_TYPES.CHECKBOX) {
      //   // check here the chosen value - for each checkbox it's a new row
      // }
      // if (content.type === EDITOR_ELEMENTS_TYPES.READ_TEXT) { // the component that scan the image (working so so)
      //   // set the text inside 
      // }
      // // CONDITIONAL ?
      // if (content.type === EDITOR_ELEMENTS_TYPES.DROP_DOWN) {
      //   //  OMG I Forgot about this ! 
      // }
      // if (content.type === EDITOR_ELEMENTS_TYPES.SCALE) {
      //   // set the inside value an the paragraph before
      // }
    });
    return svgData;
  };


  
function exportToExcel(versioned, fileName) {
  const workbook = new ExcelJS.Workbook();

Object.keys(versioned).forEach((version, index) => {
    const worksheet = workbook.addWorksheet('Sheet ' + (index + 1));
    const data = versioned[version];
    const tableHeader = worksheet.addRow(Object.keys(data[0]));
  
    tableHeader.eachCell((cell, colNumber) => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      // cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } };
      cell.font = { bold: true };
      // worksheet.getColumn(colNumber).width = 25;
    });

    data.forEach(item => {
      const rowData = Object.values(item);
      const row = worksheet.addRow(rowData);
      row.eachCell((cell) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });
    });
// 

    worksheet.columns.forEach(function (column, i) {
      let maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
              maxLength = columnLength;
          }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });
  });

    // worksheet.addRow([]);
  // });

  workbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName);
  });
}

  const convertResearchData = (data) => {
    const convertedData = data.map(
      (item) => {
        const researchData = convertFilledDataToSvg(item.filledResearch);
        return{
        date: new Date(item.date).toLocaleString(),
        ...(!!researchData && { ...researchData }),
      }
    })
    return convertedData;
  }

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
                  onClick={async () => {
                    const convertedD = convertResearchData(currentResearch?.actionsData?.participantsData);
                    const sortedByVersions = convertedD.reduce((acc, curr) => {
                      const keys = Object.keys(curr).toString();
                      if (acc[keys]) {
                        acc[keys].push(curr);
                      } else {
                        acc[keys] = [curr];
                      }
                      return acc;
                    }, {});
                    const fileName = 'output.xlsx';
                    exportToExcel(sortedByVersions, fileName);
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
