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

  // const annotateConditionalContentVisible = (pageContent) => {
  //   const conditions = pageContent.filter(content=>
  //   (content?.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP && !!content?.conditionalIndexes && content?.conditionalIndexes?.length > 0) ||
  //   (content?.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_CHECKBOX)
  //   );

  //   const condtionalContent = pageContent.filter(content=>(content?.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_CONTENT));

  //   for (let index = 0; index < conditions.length; index++) {
  //     if(conditions[index]?.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP) {
        
  //     } else if (conditions[index]?.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_CHECKBOX){

  //     }
  //   }

  // }

  const convertPageDataToSvg = (pageContent, pageIndex,svgData, isVisible = true) => {
    const conditionalVisible = {};
    let checkboxGroupTitle = 'defaultTitle_checkbox_group'; 
    for (let index = 0; index < pageContent.length; index++) {
      const content = pageContent[index];
        if (content?.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP) {
          if (isVisible && !!content?.conditionalIndexes && content?.conditionalIndexes?.length > 0 && (content?.attrs?.chosenValue !== '')){
            const chosenConditionalIndex = content?.conditionalIndexes.findIndex(value => value === content?.attrs?.chosenValue);
            if(chosenConditionalIndex > -1) {
              const visibleContentIndex = content?.correspondingIndexes?.[chosenConditionalIndex];
              if (visibleContentIndex !== undefined) {
                conditionalVisible[visibleContentIndex] = true;
              }
            }
            // content?.conditionalIndexes?.forEach(conditionalIndex=>{conditionalVisible[conditionalIndex] = true})
          }
          let title = 'radio_button_group';
          if (pageContent[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
            title = pageContent[index - 1]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
          }
          if (!isVisible) {
            svgData[pageIndex+index + '-' + title] = 'NOT_VISIBLE';
          } else {
            const chosen = content?.attrs?.chosenValue;
            svgData[pageIndex+index + '-' + title] = chosen !== '' ? content?.content?.[chosen]?.content?.[0].text : 'EMPTY';
          }
        } 
        else if (content?.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_CHECKBOX || content?.type === EDITOR_ELEMENTS_TYPES.CHECKBOX) {
          if(isVisible && content?.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_CHECKBOX && content?.attrs?.value) {
            conditionalVisible[content?.conditionTracker] = true;
          }

          if (pageContent[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) {
            checkboxGroupTitle = pageContent[index - 1]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
          }
          let option = 'defaultTitle_checkbox_option';
          if (pageContent[index]?.content?.[0]?.type === EDITOR_ELEMENTS_TYPES.TEXT) {
            option = pageContent[index]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
          }
  
          svgData[pageIndex+ '-' + index + '-' + checkboxGroupTitle + '-' + option] = isVisible ? Boolean(content?.attrs?.value) : 'NOT_VISIBLE';
        }
        else if(content?.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_CONTENT) {
          convertPageDataToSvg(content.content, pageIndex,svgData, true);// Boolean(conditionalVisible[content?.conditionContentTracker]));
        }
        else if (content.type === EDITOR_ELEMENTS_TYPES.TEXTBOX || content.type === EDITOR_ELEMENTS_TYPES.TEXTAREA) {
          let title = 'title_' + content.type;
          if (pageContent[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
            title = pageContent[index - 1]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
          }
           svgData[pageIndex+ '-' + index + '-' + title] = isVisible ? content?.attrs?.value : 'NOT_VISIBLE';
          } 
          else if (content.type === EDITOR_ELEMENTS_TYPES.IMAGE_UPLOADER) {
            let title = 'title_uploaded_Image';
            if (pageContent[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
               title = pageContent[index - 1]?.content?.[0].text; // ?.trim().replace(/\s/g, '_') 
            }
            svgData[pageIndex+ '-' + index + '-' + title] =  isVisible ? content?.attrs?.filePath: 'NOT_VISIBLE';
          } else if (content.type === EDITOR_ELEMENTS_TYPES.SCALE_CONTINUES) {
            let title = 'title_continues_scale';
            if (pageContent[index]?.content?.[0]?.type === EDITOR_ELEMENTS_TYPES.TEXT) {
              title = pageContent[index]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
            } else if (pageContent[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
              title = pageContent[index - 1]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
            }
            svgData[pageIndex+ '-' + index + '-' + title] = isVisible ? (content?.attrs?.chosenValue) : 'NOT_VISIBLE';
          } else if (content.type === EDITOR_ELEMENTS_TYPES.READ_TEXT) { // the component that scan the image (working so so)
            let title = 'title_scan_text';
            if (pageContent[index]?.content?.[0]?.type === EDITOR_ELEMENTS_TYPES.TEXT) {
              title = pageContent[index]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
            } else if (pageContent[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
              title = pageContent[index - 1]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
            }
    
            svgData[pageIndex+ '-' + index + '-' + title] = isVisible ? content?.attrs?.value : 'NOT_VISIBLE';
          } else if (content.type === EDITOR_ELEMENTS_TYPES.DROP_DOWN) { // the component that scan the image (working so so)
            let title = 'title_drop_down';
            if (pageContent[index]?.content?.[0]?.type === EDITOR_ELEMENTS_TYPES.TEXT) {
              title = pageContent[index]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
            } else if (pageContent[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
              title = pageContent[index - 1]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
            }
    
            svgData[pageIndex+ '-' + index + '-' + title] = isVisible ? content?.attrs?.chosenValue?.label : 'NOT_VISIBLE';
          } else if (content.type === EDITOR_ELEMENTS_TYPES.SCALE) { // the component that scan the image (working so so)
            let title = 'title_scale';
            if (pageContent[index]?.content?.[0]?.type === EDITOR_ELEMENTS_TYPES.TEXT) {
              title = pageContent[index]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
            } else if (pageContent[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
              title = pageContent[index - 1]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
            }
    
            svgData[pageIndex+ '-' + index + '-' + title] = isVisible ? content?.attrs?.chosenValue : 'NOT_VISIBLE';
          } else if (content.type === EDITOR_ELEMENTS_TYPES.NUMBER_INPUT) { // the component that scan the image (working so so)
            let title = 'number_input';
            if (pageContent[index]?.content?.[0]?.type === EDITOR_ELEMENTS_TYPES.TEXT) {
              title = pageContent[index]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
            } else if (pageContent[index - 1]?.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) { // CHECK OTHER TEXT TYPES?
              title = pageContent[index - 1]?.content?.[0].text; // ?.trim().replace(/\s/g, '_')
            }
    
            svgData[pageIndex+ '-' + index + '-' + title] = isVisible ? content?.attrs?.value : 'NOT_VISIBLE';
          }
        }
    }

  const convertFilledDataToSvg = (filledData, email) => {
    const svgData = {};
    console.log('filledData', filledData);
    const filledDataValues = Object.values(filledData);
    console.log('fdsf', participantsSelected);
    svgData['email'] = email;
    for (let pageIndex = 0; pageIndex < filledDataValues.length; pageIndex++) {
      convertPageDataToSvg(filledDataValues[pageIndex]?.content || [], pageIndex,svgData);
    }
    return svgData;
  };


function exportToExcel(versioned, fileName) {
  const workbook = new ExcelJS.Workbook();

Object.keys(versioned).forEach((version, index) => {
    const worksheet = workbook.addWorksheet('Sheet ' + (index + 1));
    const data = versioned[version];
    const tableHeader = worksheet.addRow(Object.keys(data[0]));
  
    tableHeader.eachCell((cell) => {
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.font = { bold: true };
    });

    data.forEach(item => {
      const rowData = Object.values(item);
      const row = worksheet.addRow(rowData);
      row.eachCell((cell) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });
    });

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

  workbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName);
  });
}

  const convertResearchData = (data) => {
    const convertedData = data.map(
      (item) => {
        const researchData = convertFilledDataToSvg(item.filledResearch, item.email);
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
