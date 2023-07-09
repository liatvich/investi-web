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
import { PreviewRadioButtonGroup } from './PreviewRadioButtonGroup';
import { PreviewImage } from './PreviewImage';
import { PreviewTextbox } from './PreviewTextbox';
import { EDITOR_ELEMENTS_TYPES } from '../../../common/consts';
import ImageUploader from '../../Editor/ReactComponents/ImageUploader';

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

export function PreviewParser({
  researchData,
  disable: disabled = false,
  participantEmail = '',
  researchId = '',
  managerId = '',
}) {
  return (
    <div className={s.main} key={Math.floor(Math.random() * 1000 + 1)}>
      {
        researchData?.content?.map((node, index) => {
          if (node.type === EDITOR_ELEMENTS_TYPES.HEADING
            || node.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) {
            return <PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />;
          } if (node.type === EDITOR_ELEMENTS_TYPES.BULLET_LIST
            || node.type === EDITOR_ELEMENTS_TYPES.ORDERED_LIST) {
            return renderList(node);
          } if (node.type === EDITOR_ELEMENTS_TYPES.VALIDATION_CHECKBOX) {
            return (
              <PreviewValidationCheckbox
                node={node}
              />
            );
          } if (node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP) {
            return (
              <PreviewRadioButtonGroup
                node={node}
                disabled={disabled}
                key={Math.floor(Math.random() * 1000 + 1)}
              />
            );
          } if (node.type === EDITOR_ELEMENTS_TYPES.IMAGE_UPLOADER) {
            if (disabled) {
              return (
                <PreviewImage
                  key={Math.floor(Math.random() * 1000 + 1)}
                  node={node}
                />
              );
            }
            return (
              <ImageUploader
                key={Math.floor(Math.random() * 1000 + 1)}
                disabled={false}
                researchId={researchId}
                managerId={managerId}
                participantEmail={participantEmail}
                node={node}
              />
            );
          }
          if (node.type === EDITOR_ELEMENTS_TYPES.TEXTBOX) {
            return (
              <PreviewTextbox
                node={node}
                disabled={disabled}
                key={Math.floor(Math.random() * 1000 + 1)}
              />
            );
          } if (node.type === EDITOR_ELEMENTS_TYPES.IMAGE) {
            return renderImage(node);
          } if (node.type === EDITOR_ELEMENTS_TYPES.EXTERNAL_VIDEO) {
            return renderExternalVideo(node);
          }
          return <div key={Math.floor(Math.random() * 1000 + 1)} />;
        })
      }
    </div>
  );
}

export default PreviewParser;
