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
import { Link } from 'react-router-dom';
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

  const { getDatabase } = useDatabase();
  const { user } = useProvideAuth();

  //   useEffect(() => {
  //     async function createNewExperiment() {
  //       // Add a new document with a generated id.
  //       const experimentRef = await addDoc(collection(getDatabase(), 'experiments'), {
  //         user_id: getLoggedUser() && getLoggedUser().uid,
  //       });
  //       setCurrentExperiment(experimentRef);
  //     }

  //     createNewExperiment();
  //     // setLoggedUser(firebase.auth().currentUser);
  //   }, []);

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
        {/* {editor && (
        <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </Button>
        </BubbleMenu>
        )} */}

        {editor && (<MenuBar editor={editor} />)}
        <EditorContent className="editor-content" editor={editor} />
      </div>
      {/* <Button variant="contained">Add Page</Button> */}
      <Button
        variant="contained"
        onClick={async () => {
          // const dataBase = getDatabase();
          // const researchCol = collection(dataBase, 'research');
          // const researchList = researchSnapshot.docs.map((doc) => doc.data());

          // Add a new document with a generated id.
          const dataBase = getDatabase();
          //   collection(dataBase, 'experiments')
          const experimentsRef = collection(dataBase, 'experiments');
          const docRef = await addDoc(experimentsRef, {
            user_id: user?.uid,
            title: experimentTitle,
            data: { 0: editor.getJSON() },
          });

          setCurrentDocId(docRef.id);
        //   await updateDoc(currentExperiment, {
        //     title: experimentTitle,
        //     data: editor.getHTML(),
        //     // timestamp: serverTimestamp(),
        //   });
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
        onClick={async () => {
        //   // const dataBase = getDatabase();
        //   // const researchCol = collection(dataBase, 'research');
        //   // const researchList = researchSnapshot.docs.map((doc) => doc.data());

          //   // Add a new document with a generated id.
          //   const dataBase = getDatabase();
          //   //   collection(dataBase, 'experiments')
          //   const experimentsRef = collection(dataBase, 'experiments');
          //   await addDoc(experimentsRef, {
          //     user_id: user?.uid,
          //     title: experimentTitle,
          //     data: editor.getJSON(),
          //   });

        // //   await updateDoc(currentExperiment, {
        // //     title: experimentTitle,
        // //     data: editor.getHTML(),
        // //     // timestamp: serverTimestamp(),
        // //   });
        }}
      >
        Add Page
      </Button>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/invoices">Invoices</Link>
        {' '}
        |
        {' '}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}

export default CreateExperiment;
