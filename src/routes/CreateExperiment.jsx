import React, { useState, useContext } from 'react';
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import './styles.scss'
import './CreateExperiment.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import {
  collection, addDoc,
} from 'firebase/firestore/lite'; // serverTimestamp, updateDoc
import { useDatabase } from '../Hooks';
import { UserContext } from '../context';

export function CreateExperiment() {
//   const [currentExperiment, setCurrentExperiment] = useState({});
  const [experimentTitle, setExperimentTitle] = useState('');
  const { getLoggedUser } = useContext(UserContext);
  const { getDatabase } = useDatabase();

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
    ],
    content: `
      <p>
        Try to select <em>this text</em> to see what we call the bubble menu.
      </p>
      <p>
        Neat, isn’t it? Add an empty paragraph to see the floating menu.
      </p>
    `,
  });

  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        Experiment title:
      </Typography>
      <TextField id="standard-basic" label="Standard" variant="standard" placeholder="Please enter title" onChange={(event) => { setExperimentTitle(event.target.value); }} />
      <div className="editor-container">
        {editor && (
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
        )}

        {editor && (
        <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet List
          </Button>
        </FloatingMenu>
        )}

        <EditorContent editor={editor} />
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
          await addDoc(experimentsRef, {
            user_id: getLoggedUser() && getLoggedUser().uid,
            title: experimentTitle,
            data: editor.getHTML(),
          });

        //   await updateDoc(currentExperiment, {
        //     title: experimentTitle,
        //     data: editor.getHTML(),
        //     // timestamp: serverTimestamp(),
        //   });
        }}
      >
        Submit
      </Button>
      {/* <Button variant="contained">Preview</Button> */}
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
