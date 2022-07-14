import React, { useState } from 'react';
import {
  useEditor,
  EditorContent,
//   BubbleMenu,
//   FloatingMenu,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import './styles.scss'
import './CreateExperiment.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import {
  collection, addDoc,
} from 'firebase/firestore/lite'; // serverTimestamp, updateDoc
import { useDatabase, useProvideAuth } from '../../Hooks';
import MenuBar from '../../components/Editor/MenuBar';
// import { UserContext } from '../context';
import ValidationCheckboxExtension from '../../components/Editor/ReactComponents/ValidationCheckboxExtension';
import TextboxExtension from '../../components/Editor/ReactComponents/TextboxExtension';
import ExternalVideoExtension from '../../components/Editor/ReactComponents/ExternalVideoExtension';

export function CreateExperiment() {
//   const [currentExperiment, setCurrentExperiment] = useState({});
  const [experimentTitle, setExperimentTitle] = useState('');
  const [currentDocId, setCurrentDocId] = useState(null);
  const [currentResearchJson, setCurrentResearchJson] = useState({});
  const [pagesCounter, setPagesCounter] = useState(1);

  const { getDatabase } = useDatabase();
  const { user } = useProvideAuth();

  const editor = useEditor({
    extensions: [
      StarterKit,
      //   TaskList,
      //   TaskItem.configure({
      //     nested: true,
      //   }),
      ValidationCheckboxExtension,
      TextboxExtension,
      Image,
      Dropcursor,
      ExternalVideoExtension,
    //   ListItem.extend({
    //     content: 'text*',
    //   }),
    ],
    content: `
      <p>
        Try to select <em>this text</em> to see what we call the bubble menu.
      </p>
      <p>
        Neat, isn't it? Add an empty paragraph to see the floating menu.
      </p>
      <validationCheckbox/>
    `,
  });

  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        Experiment title:
      </Typography>
      <TextField id="standard-basic" label="Standard" variant="standard" placeholder="Please enter title" onChange={(event) => { setExperimentTitle(event.target.value); }} />
      <div className="editor-container">

        {editor && (<MenuBar editor={editor} />)}
        <EditorContent className="editor-content" editor={editor} />
      </div>
      <Button
        variant="contained"
        onClick={async () => {
          const dataBase = getDatabase();
          const experimentsRef = collection(dataBase, 'experiments');
          currentResearchJson[`${pagesCounter}`] = editor.getJSON();
          const docRef = await addDoc(experimentsRef, {
            user_id: user?.uid,
            title: experimentTitle,
            data: { ...currentResearchJson },
          });

          setCurrentDocId(docRef.id);
        }}
      >
        Submit
      </Button>
      {
        currentDocId && (
        <Typography variant="contained" gutterBottom component="div">
          currentDocId:
          {' '}
          {currentDocId}
        </Typography>
        )
      }
      <Button
        variant="contained"
        onClick={() => {
          setCurrentResearchJson((researchJson) => {
            const prevResearchJson = researchJson;
            prevResearchJson[`${pagesCounter}`] = editor.getJSON();
            return researchJson;
          });
          setPagesCounter(pagesCounter + 1);
          editor.commands.clearContent();
        }}

      >
        Add Page
      </Button>
      <Typography component="div">
        Page Number:
        {' '}
        {pagesCounter}
      </Typography>
    </div>
  );
}

export default CreateExperiment;
