/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty */
/* eslint-disable global-require */
import React, { createRef, useState, useEffect } from 'react';
import {
  Typography, List, ListItem, FormControl, FormHelperText, Checkbox,
} from '@mui/material';
import s from './PreviewParser.module.scss';

const EDITOR_ELEMENTS_TYPES = {
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  BULLET_LIST: 'bulletList',
  ORDERED_LIST: 'orderedList',
  VALIDATION_CHECKBOX: 'validationCheckbox',
  TEXT: 'text',
  HARD_BREAK: 'hardBreak',
};

export function PreviewParser({
  researchData,
  checkBoxClick,
}) {
  const [checkedValidationCount, setCheckedValidationCount] = useState(true);
  let checkboxCounter = 0;

  useEffect(() => {
    checkboxCounter = 0;
  }, [researchData]);

  const renderText = (textNode) => textNode?.content?.map((content) => {
    if (content?.type === EDITOR_ELEMENTS_TYPES.TEXT) {
      return (
        <Typography
          variant={textNode?.attrs?.level ? (textNode?.attrs?.level === 1 ? 'h4' : 'h5') : 'body1'}
          gutterBottom
          component="span"
          key={Math.floor(Math.random() * 1000 + 1)}
        >
          {content.text || ' '}
        </Typography>
      );
    } if (content.type === EDITOR_ELEMENTS_TYPES.HARD_BREAK) {
      return <br />;
    }
    return <></>;
  });

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
            {listContent.content.map((listItemContent) => renderText(listItemContent))}
          </ListItem>
        );
      })}
    </List>
  );

  const renderValidationCheckbox = (
    validationCheckbox,
    // eslint-disable-next-line no-shadow
    checkBoxClick,
    id,
  ) => { //  React.forwardRef(
    //   const [value, setValue] = useState(false);
    checkboxCounter += 1;
    const checkboxForm = (
      <FormControl
        key={Math.floor(Math.random() * 1000 + 1)}
        required
        component="fieldset"
        variant="standard"
      >
        <div className="validation">
          <Checkbox
            key={Math.floor(Math.random() * 1000 + 1)}
            onChange={(event) => {
            //   setValue(event.target.checked);
              checkBoxClick(event.target.checked, event.target.id);
            }}
            // checked={value}
            id={id}
          />
          {renderText(validationCheckbox)}
        </div>
        <FormHelperText key={Math.floor(Math.random() * 1000 + 1)}>Must Be Checked</FormHelperText>
      </FormControl>
    );
    return checkboxForm;
  };

  //   const RenderValidationCheckbox = ({
  //     validationCheckbox,
  //     // eslint-disable-next-line no-shadow
  //     checkBoxClick,
  //     id,
  //   }) => { //  React.forwardRef(
  //     const [value, setValue] = useState(false);
  //     const checkboxForm = (
  //       <FormControl
  //         key={Math.floor(Math.random() * 1000 + 1)}
  //         required
  //         component="fieldset"
  //         variant="standard"
  //         error={!value}
  //       >
  //         <div className="validation">
  //           <Checkbox
  //             key={Math.floor(Math.random() * 1000 + 1)}
  //             onChange={(event) => {
  //               setValue(event.target.checked);
  //               checkBoxClick(event.target.checked);
  //             }}
  //             checked={value}
  //             id={id}
  //           />
  //           {renderText(validationCheckbox)}
  //         </div>
  //         <FormHelperText key={Math.floor(Math.random() * 1000 + 1)}>
  //   Must Be Checked</FormHelperText>
  //       </FormControl>
  //     );
  //     return checkboxForm;
  //   };

  return (
    <div className={s.main} key={Math.floor(Math.random() * 1000 + 1)}>
      {
        researchData?.content?.map((node, index) => {
          if (node.type === EDITOR_ELEMENTS_TYPES.HEADING
            || node.type === EDITOR_ELEMENTS_TYPES.PARAGRAPH) {
            return renderText(node);
          } if (node.type === EDITOR_ELEMENTS_TYPES.BULLET_LIST
            || node.type === EDITOR_ELEMENTS_TYPES.ORDERED_LIST) {
            return renderList(node);
          } if (node.type === EDITOR_ELEMENTS_TYPES.VALIDATION_CHECKBOX) {
            return renderValidationCheckbox(
              node,
              checkBoxClick,
              checkboxCounter.toString(),
            );
            // const ref = React.createRef();
            // setValidationRefs((prevRefs) => [...prevRefs, ref]);
            // return (
            //   <RenderValidationCheckbox
            //     validationCheckbox={node}
            //     checkBoxClick={checkBoxClick}
            //     key={Math.floor(Math.random() * 1000 + 1)}
            //     id={index}
            //   />
            // );
            // );
            // );
          }
          return <div key={Math.floor(Math.random() * 1000 + 1)}>NONE</div>;
        })
      }
    </div>
  );
}

export default PreviewParser;
