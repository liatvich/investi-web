/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty */
/* eslint-disable global-require */
import React from 'react';
import {
  List, ListItem,
} from '@mui/material';
import s from './PreviewParser.module.scss';
import { PreviewText } from './PreviewText';
import { PreviewValidationCheckbox } from './PreviewValidationCheckbox';
import { PreviewCheckbox } from './PreviewCheckbox';
import { PreviewRadioButtonGroup } from './PreviewRadioButtonGroup';
import { PreviewImage } from './PreviewImage';
import { PreviewScale } from './PreviewScale';
import { PreviewContinuesScale } from './PreviewContinuesScale';
import { PreviewTextbox } from './PreviewTextbox';
import { EDITOR_ELEMENTS_TYPES } from '../../../common/consts';
// import ImageUploader from '../../Editor/ReactComponents/ImageUploader';
import { PreviewImageUpload } from './PreviewImageUpload';
import { PreviewTextArea } from './PreviewTextArea';

const renderImage = (node) => (
  <div>
    <img className={s.image} src={node?.attrs?.src} alt="img" />
  </div>
);

const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

const renderExternalVideo = (node) => (
  <iframe
    width={isMobile ? 350 : 950}
    height={isMobile ? 200 : 534}
    src={node?.attrs?.src}
    frameBorder="0"
    title="video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);

const renderList = (listNode) => (
  <List
    key={Math.floor(Math.random() * 1000 + 1)}
    component={listNode?.type === EDITOR_ELEMENTS_TYPES.BULLET_LIST ? 'ul' : 'ol'}
    className={s.item}
  >
    {/* assuming its type is 'listItem' */}
    {listNode?.content?.map((listContent) => {
      const i = Math.floor(Math.random() * 1000 + 1);
      return (
        <ListItem sx={{ display: 'list-item' }} key={i}>
          {listContent.content.map((listItemContent) => (
            <PreviewText
              key={Math.floor(Math.random() * 1000 + 1)}
              node={listItemContent}
            />
          ))}
        </ListItem>
      );
    })}
  </List>
);

const wrapWithExteriorDiv = (children) => ( 
  <div className={s.preview_node}>
    {children}
  </div>
);


const wrapWithExteriorDivOnTop = (children) => ( 
  <div className={s.preview_node_top}>
    {children}
  </div>
);


export function PreviewParser({
  researchData,
  disable: disabled = false,
  participantId = '',
  researchId = '',
  managerId = '',
}) {
  return (
    <div className={s.main} key={Math.floor(Math.random() * 1000 + 1)}>
      {
        researchData?.content?.filter(node=>Object.values(node).length>1).map((node, index) => {
          // <div className={s.preview_node}>{}</div>;
          if (node.type === EDITOR_ELEMENTS_TYPES.HEADING
            || node.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) {
            return wrapWithExteriorDivOnTop(<PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />);
          } if (node.type === EDITOR_ELEMENTS_TYPES.BULLET_LIST
            || node.type === EDITOR_ELEMENTS_TYPES.ORDERED_LIST) {
            return wrapWithExteriorDiv(renderList(node));
          } if (node.type === EDITOR_ELEMENTS_TYPES.VALIDATION_CHECKBOX) {
            return (
              wrapWithExteriorDiv(<PreviewValidationCheckbox
                key={Math.floor(Math.random() * 1000 + 1)}
                node={node}
              />)
            );
          } 
          if (node.type === EDITOR_ELEMENTS_TYPES.CHECKBOX) {
            return (
              wrapWithExteriorDiv(<PreviewCheckbox
                key={Math.floor(Math.random() * 1000 + 1)}
                node={node}
              />)
            );
          } 
          if (node.type === EDITOR_ELEMENTS_TYPES.TEXTAREA) {
            return (
              wrapWithExteriorDiv(<PreviewTextArea
                key={Math.floor(Math.random() * 1000 + 1)}
                node={node}
              />)
            );
          } 
          if (node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP) {
            return (
              wrapWithExteriorDiv(<PreviewRadioButtonGroup
                node={node}
                disabled={disabled}
                key={Math.floor(Math.random() * 1000 + 1)}
              />)
            );
          } if (node.type === EDITOR_ELEMENTS_TYPES.IMAGE_UPLOADER) {
            if (disabled) {
              return (
                wrapWithExteriorDiv(<PreviewImage
                  key={Math.floor(Math.random() * 1000 + 1)}
                  node={node}
                />)
              );
            }
            return (
              wrapWithExteriorDiv(<PreviewImageUpload
                key={Math.floor(Math.random() * 1000 + 1)}
                disabled={false}
                researchId={researchId}
                managerId={managerId}
                participantId={participantId}
                node={node}
              />)
            );
          } if (node.type === EDITOR_ELEMENTS_TYPES.SCALE) {
            return (
              wrapWithExteriorDiv(<PreviewScale
                node={node}
                disabled={disabled}
                key={Math.floor(Math.random() * 1000 + 1)}
              />)
            );
          }
          if (node.type === EDITOR_ELEMENTS_TYPES.SCALE_CONTINUES) {
            return wrapWithExteriorDiv(<PreviewContinuesScale
              node={node}
              disabled={disabled}
              key={Math.floor(Math.random() * 1000 + 1)}
            />);
          }
          if (node.type === EDITOR_ELEMENTS_TYPES.TEXTBOX) {
            return wrapWithExteriorDiv(
              <PreviewTextbox
                node={node}
                disabled={disabled}
                key={Math.floor(Math.random() * 1000 + 1)}
              />
            );
          } if (node.type === EDITOR_ELEMENTS_TYPES.IMAGE) {
            return wrapWithExteriorDiv(renderImage(node));
          } if (node.type === EDITOR_ELEMENTS_TYPES.EXTERNAL_VIDEO) {
            return wrapWithExteriorDiv(renderExternalVideo(node));
          }
          return <div key={Math.floor(Math.random() * 1000 + 1)} />;
          
        })
      }
    </div>
  );
}

export default PreviewParser;
