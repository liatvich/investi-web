/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc, getDoc, setDoc,
} from 'firebase/firestore/lite';
import { EDITOR_ELEMENTS_TYPES } from '../../common/consts';

import { useDatabase } from '../../Hooks';
import { ResearchPreview } from '../../components/App/Preview/ResearchPreview';
import { emailValidation } from '../../common/general';
import { UploadImageResearchContent } from './UploadImageResearchContent';

export function ConsumerResearchPreview() {
  const { activeResearch, email } = useParams();
  const { getDatabase } = useDatabase();
  const navigate = useNavigate();
  const [research, setResearch] = useState(null);
  const [title, setTitle] = useState('');
  const [managerId, setManagerId] = useState('');
  const [imageUploadDescription, setImageUploadDescription] = useState('');
  const [consumerStage, setConsumerStage] = useState('ResearchPreview');

  useEffect(() => {
    async function fetchResearch() {
      if (!emailValidation(email)) {
        navigate(-1);
      }

      const dataBase = getDatabase();
      const docRef = doc(dataBase, 'experiments', activeResearch);
      const docResearch = await getDoc(docRef);
      if (docResearch.exists() && docResearch.data()?.data) {
        const signupRef = doc(dataBase, 'experiments', activeResearch, 'signups', email);
        const signupDoc = await getDoc(signupRef);
        if (signupDoc.exists()) {
          if (signupDoc.data()?.status === 'approved' && docResearch.data()?.status === 'started') {
            setImageUploadDescription(docResearch.data()?.description);
            setManagerId(docResearch.data()?.user_id);
            setConsumerStage('ImageUpload');
          }
        } else {
          setResearch(docResearch.data()?.data);
          setTitle(docResearch.data()?.title);
        }
      } else {
        navigate(-1);
      }
    }

    fetchResearch();
  }, []);

  return (
    <div>
      {research && consumerStage === 'ResearchPreview'
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
        ) : (consumerStage === 'ImageUpload'
          ? (
            <UploadImageResearchContent
              description={imageUploadDescription}
              participantEmail={email}
              researchId={activeResearch}
              managerId={managerId}
            />
          )
          : <div />)}
    </div>
  );
}

export default ConsumerResearchPreview;
