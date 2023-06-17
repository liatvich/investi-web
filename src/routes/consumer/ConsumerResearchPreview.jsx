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

  const groupRadioButtons = (researchData) => Object.values(researchData)?.map(
    (page) => page?.content?.reduce(
      (acc, node) => {
        if (node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON) {
          if (acc[acc.length - 1]?.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP) {
            acc[acc.length - 1].content.push(node);
          } else {
            acc.push({
              type: EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP,
              content: [node],
              attrs: { chosenValue: '0' },
            });
          }
        } else {
          acc.push(node);
        }
        return acc;
      },
      [],
    ),
  ).reduce((acc, page) => {
    acc.push({ content: page, type: 'doc' });
    return acc;
  }, []);

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
          if (docResearch.data()?.researchType === 'QUICK') {
            // user is refilling the research -- think if we want to allow that
            setResearch({ ...groupRadioButtons(docResearch.data()?.data) });
            setTitle(docResearch.data()?.title);
          } else if (signupDoc.data()?.status === 'approved' && docResearch.data()?.status === 'started') {
            setImageUploadDescription(docResearch.data()?.description);
            setManagerId(docResearch.data()?.user_id);
            setConsumerStage('ImageUpload');
          }
        } else {
          setResearch({ ...groupRadioButtons(docResearch.data()?.data) });
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
              // const userInputs = Object.keys(filledResearch)?.reduce((inputs, docIndex) => {
              //   const teaxtboxes = filledResearch[docIndex]?.content
              //     ?.filter((node) => node.type === EDITOR_ELEMENTS_TYPES.TEXTBOX);
              //   // eslint-disable-next-line no-param-reassign
              //   inputs[docIndex] = teaxtboxes;
              //   return inputs;
              // }, {});

              // I used to save only the text box answer - I decided to save all the docs
              // I can reduce the amount of saved data tremendously

              const dataBase = getDatabase();
              await setDoc(doc(dataBase, `experiments/${activeResearch}/signups`, email), {
                filledResearch,
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
