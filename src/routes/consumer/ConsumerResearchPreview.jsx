import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc, getDoc, setDoc,
} from 'firebase/firestore/lite';
import { EDITOR_ELEMENTS_TYPES } from '../../common/consts';

import { useDatabase } from '../../Hooks';
import { ResearchPreview } from '../../components/App/Preview/ResearchPreview';
import { emailValidation } from '../../common/general';

export function ConsumerResearchPreview() {
  const { activeResearch, email } = useParams();
  const { getDatabase } = useDatabase();
  const navigate = useNavigate();
  const [research, setResearch] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function fetchResearch() {
      if (!emailValidation(email)) {
        navigate(-1);
      }

      const dataBase = getDatabase();
      const docRef = doc(dataBase, 'experiments', activeResearch);
      const docResearch = await getDoc(docRef);

      if (docResearch.exists() && docResearch.data()?.data) {
        setResearch(docResearch.data()?.data);
        setTitle(docResearch.data()?.title);
      } else {
        navigate(-1);
      }
    }

    fetchResearch();
  }, []);

  return (
    <div>
      {research
        ? (
          <ResearchPreview
            research={research}
            isConsumer
            title={title}
            // eslint-disable-next-line no-unused-vars
            submitOnClick={async (filledResearch) => {
              const userInputs = Object.keys(filledResearch)?.reduce((inputs, docIndex) => {
                const teaxtboxes = filledResearch[docIndex]?.content
                  ?.filter((node) => node.type === EDITOR_ELEMENTS_TYPES.TEXTBOX);
                // eslint-disable-next-line no-param-reassign
                inputs[docIndex] = teaxtboxes;
                return inputs;
              }, {});

              const dataBase = getDatabase();
              await setDoc(doc(dataBase, `experiments/${activeResearch}/signups`, email), {
                inputs: userInputs,
                email,
                date: Date.now(),
              });
            }}
          />
        ) : <div>NO RESEARCH FOUND</div>}
    </div>
  );
}

export default ConsumerResearchPreview;
