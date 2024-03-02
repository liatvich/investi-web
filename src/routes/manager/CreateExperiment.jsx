import React, { useState, useEffect } from 'react';
import {
  useEditor,
  EditorContent,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import CreateIcon from '@mui/icons-material/Create';
import MenuBar from '../../components/Editor/MenuBar';
import ValidationCheckboxExtension from '../../components/Editor/ReactComponents/ValidationCheckboxExtension';
import TextboxExtension from '../../components/Editor/ReactComponents/TextboxExtension';
import RadioButtonExtension from '../../components/Editor/ReactComponents/RadioButtonExtension';
import ScaleExtension from '../../components/Editor/ReactComponents/ScaleExtension';
import ImageUploaderExtension from '../../components/Editor/ReactComponents/ImageUploaderExtension';
import ExternalVideoExtension from '../../components/Editor/ReactComponents/ExternalVideoExtension';
import s from './CreateExperiment.module.scss';
import { RoundButton } from '../../components/RoundButton';
import { RESEARCH_STATUS } from '../../common/consts';
import './CreateExperiment.scss';

export function CreateExperiment({
  // eslint-disable-next-line react/prop-types, no-unused-vars
  onComplete, title, updateResearchId, researchJson, onSaveResearch,
}) {
  const [experimentTitle, setExperimentTitle] = useState(title || '');
  // eslint-disable-next-line no-unused-vars
  const [currentResearchJson, setCurrentResearchJson] = useState((
    Boolean(researchJson) && Object.values(researchJson))
    || []);
  const [pagesCounter, setPagesCounter] = useState(0);
  const [totalPages, setTotalPages] = useState(
    (researchJson && Object.values(researchJson).length) || 1,
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      //   TaskList,
      //   TaskItem.configure({
      //     nested: true,
      //   }),
      ValidationCheckboxExtension,
      TextboxExtension,
      RadioButtonExtension,
      ScaleExtension,
      ImageUploaderExtension,
      Image,
      Dropcursor,
      ExternalVideoExtension,
    //   ListItem.extend({
    //     content: 'text*',
    //   }),
    ],
    content: `
      <p>
        Start Writing Your New Research Here!
      </p>
    `,
  });

  useEffect(() => {
    if (updateResearchId && researchJson?.[0]) {
      // eslint-disable-next-line react/prop-types
      editor?.commands?.setContent(researchJson?.[0]?.content);
    }
  }, [editor]);

  const moveToPage = (page) => {
    currentResearchJson[pagesCounter] = editor.getJSON();
    setCurrentResearchJson(currentResearchJson);
    setPagesCounter(page);

    // Adding Page
    if (page >= totalPages) {
      setTotalPages(totalPages + 1);
      editor.commands.clearContent();
    } else {
      editor.commands.setContent(currentResearchJson[page]);
    }
  };

  const next = () => {
    moveToPage(pagesCounter + 1);
  };

  const back = () => {
    moveToPage(pagesCounter - 1);
  };

  return (
    <div className={s.root}>
      <div className={s.topBar}>
        <div className={s.input}>
          <TextField
            autoComplete={false}
            defaultValue={experimentTitle || 'Experiment Name'}
            id="standard-basic"
            variant="standard"
            placeholder="Please enter title"
            disableRipple
            onChange={(event) => { setExperimentTitle(event.target.value); }}
            className={s.title}
            disableUnderline={false}
            sx={{
              width: 300,
              '& .MuiInput-underline:before': {
                borderBottom: 0,
              },
              '& .MuiInput-underline:after': {
                borderBottom: 0,
              },
              '& .MuiInput-underline:hover': {
                borderBottom: 0,
              },
              '& .MuiInput-input': {
                color: '#2C3D8F',
                fontSize: 24,
              },
            }}
          />
          <CreateIcon sx={{
            width: '20px',
            height: '25px',
            color: '#2C3D8F',
            marginLeft: '17px',
          }}
          />
        </div>
        <div className={s.pages}>
          {pagesCounter > 0
            ? (
              <RoundButton
                height="39px"
                width="39px"
                arrowHeight="8px"
                arrowWidth="14px"
                isBack
                onClick={back}
              />
            )
            : <div className={s.placeholder} /> }
          <Typography variant="h5" component="div" className={s.text}>
            Pages
            {' '}
            {pagesCounter + 1}
            {' '}
            /
            {' '}
            {totalPages}
          </Typography>
          {pagesCounter < (totalPages - 1) ? (
            <RoundButton height="39px" width="39px" arrowHeight="8px" arrowWidth="14px" onClick={next} />)
            : (<div className={s.placeholder} />)}
        </div>
        <div className={s.actions}>
          <Button
            disableRipple
            variant="text"
            size="large"
            className={s.draft}
            onClick={async () => {
              currentResearchJson[pagesCounter] = editor.getJSON();
              await onSaveResearch(experimentTitle, currentResearchJson, RESEARCH_STATUS.DRAFT);
              onComplete();
            }}
          >
            Save draft
          </Button>
          <Button
            disableRipple
            size="large"
            variant="contained"
            className={s.submit}
            onClick={async () => {
              currentResearchJson[pagesCounter] = editor.getJSON();
              await onSaveResearch(experimentTitle, currentResearchJson, RESEARCH_STATUS.PUBLISHED);
              onComplete();
            }}
          >
            Submit research
          </Button>
        </div>
      </div>
      <div className="editor-container">
        {editor && (
        <MenuBar
          editor={editor}
          onAddPage={next}
          onDeletePage={() => {
            if (pagesCounter !== currentResearchJson.length) {
              currentResearchJson.splice(pagesCounter, 1);
              setCurrentResearchJson(currentResearchJson);
            }

            setTotalPages(totalPages - 1);
            if (pagesCounter > 0) {
              setPagesCounter(pagesCounter - 1);
              editor.commands.setContent(currentResearchJson[pagesCounter - 1]);
            } else {
              editor.commands.setContent(currentResearchJson[pagesCounter]);
            }
          }}
          totalPages={totalPages}
        />
        )}
        <EditorContent className="editor-content" editor={editor} />
      </div>
      {/* {
        currentDocId && (
        <Typography variant="contained" gutterBottom component="div">
          currentDocId:
          {' '}
          {currentDocId}
        </Typography>
        )
      } */}
    </div>
  );
}

export default CreateExperiment;
