/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc, getDoc, setDoc,
} from 'firebase/firestore/lite';
import _ from 'lodash';
import { EDITOR_ELEMENTS_TYPES } from '../../common/consts';

import { useDatabase } from '../../Hooks';
import { ResearchPreview } from '../../components/App/Preview/ResearchPreview';
import { emailValidation } from '../../common/general';
import { UploadImageResearchContent } from './UploadImageResearchContent';
import s from './ConsumerResearchPreview.module.scss';

export function ConsumerResearchPreview() {
  const { activeResearch, email } = useParams();
  const { getDatabase } = useDatabase();
  const navigate = useNavigate();
  const [research, setResearch] = useState(null);
  const [title, setTitle] = useState('');
  const [managerId, setManagerId] = useState('');
  const [imageUploadDescription, setImageUploadDescription] = useState('');
  const [consumerStage, setConsumerStage] = useState('ResearchPreview');
  const [participantId, setParticipantId] = useState('');

  const groupConditionalContentRadioButtons = (conditionalNode, contentId) => conditionalNode?.content?.reduce(
      (acc, node, index) => {
        if (node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON || node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_RADIO_BUTTON) {
          if (acc.goingArray[acc.goingArray.length - 1]?.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP) {
            const radioGroup = acc.goingArray[acc.goingArray.length - 1];
            if (node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_RADIO_BUTTON) {
              if (!radioGroup.conditionalIndexes) {
                radioGroup.conditionalIndexes = [];
              }
              if(radioGroup.conditionalIndexes.length === 0) {
                radioGroup.conditionalIndexes = [radioGroup.content.length];
              } else {
                radioGroup.conditionalIndexes.push(radioGroup.content.length);
              }
            if(!radioGroup.correspondingIndexes ) {
              radioGroup.correspondingIndexes = [];
              }
              radioGroup.correspondingIndexes.push(acc.conditionTracker);
              acc.conditionTracker++;
            }
            radioGroup.content.push(node);
          } else {
            const radioGroupConditional = 
              {
                type: EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP,
                content: [node],
                attrs: { chosenValue: ''},
            };
            if (node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_RADIO_BUTTON) {
              radioGroupConditional.conditionalIndexes = [0];
              radioGroupConditional.correspondingIndexes = [acc.conditionTracker];
              acc.conditionTracker++;
            }
            acc.goingArray.push(radioGroupConditional);
          }
        } else if (node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_CHECKBOX) {
          node.conditionTracker = acc.conditionTracker;
          acc.conditionTracker++;
          acc.goingArray.push(node);
        } else if (node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_CONTENT) {
          const convertedNode = groupConditionalContentRadioButtons(node, acc.contentId + '-' + acc.conditionContentTracker);
          convertedNode.conditionContentTracker = acc.conditionContentTracker;
          acc.conditionContentTracker++;
          acc.goingArray.push(convertedNode);
        }
        else {
          acc.goingArray.push(node);
        }
        return acc;
      },
      {goingArray: [], conditionTracker: 0, conditionContentTracker: 0, contentId: contentId.toString()},
    );


  const groupRadioButtons = (researchData) => Object.values(researchData)?.map(
    (page) => page?.content?.reduce(
      (acc, node, index) => {
        if (node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON || node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_RADIO_BUTTON) {
          if (acc.goingArray[acc.goingArray.length - 1]?.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP) {
            const radioGroup = acc.goingArray[acc.goingArray.length - 1];
            if (node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_RADIO_BUTTON) {
              if (!radioGroup.conditionalIndexes) {
                radioGroup.conditionalIndexes = [];
              }
              if(radioGroup.conditionalIndexes.length === 0) {
                radioGroup.conditionalIndexes = [radioGroup.content.length];
              } else {
                radioGroup.conditionalIndexes.push(radioGroup.content.length);
              }
            if(!radioGroup.correspondingIndexes ) {
              radioGroup.correspondingIndexes = [];
              }
              radioGroup.correspondingIndexes.push(acc.conditionTracker);
              acc.conditionTracker++;
            }
            radioGroup.content.push(node);
          } else {
            const radioGroupConditional = 
              {
                type: EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_GROUP,
                content: [node],
                attrs: { chosenValue: ''},
            };
            if (node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_RADIO_BUTTON) {
              radioGroupConditional.conditionalIndexes = [0];
              radioGroupConditional.correspondingIndexes = [acc.conditionTracker];
              acc.conditionTracker++;
            }
            acc.goingArray.push(radioGroupConditional);
          }
        } else if (node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_CHECKBOX) {
          node.conditionTracker = acc.conditionTracker;
          acc.conditionTracker++;
          acc.goingArray.push(node);
        } else if (node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_CONTENT) {
          const convertedNode = groupConditionalContentRadioButtons(node, acc.conditionContentTracker);
          convertedNode.conditionContentTracker = acc.conditionContentTracker;
          acc.conditionContentTracker++;
          acc.goingArray.push(convertedNode);
        }
        else {
          acc.goingArray.push(node);
        }
        return acc;
      },
      {goingArray: [], conditionTracker: 0, conditionContentTracker: 0},
    ),
  ).reduce((acc, page) => {
    acc.push({ content: page.goingArray, type: 'doc' });
    return acc;
  }, []);


  //////


  useEffect(() => {
    async function fetchResearch() {
      const dataBase = getDatabase();
      const docRef = doc(dataBase, 'experiments', activeResearch);
      const docResearch = await getDoc(docRef);
      if (docResearch.exists() && docResearch.data()?.data) {
        if (!docResearch.data()?.researchType === 'QUICK' && !emailValidation(email)) {
          navigate(`/research/${activeResearch}`);
        }
        const _participantId = email || (Date.now()).toString();
        setParticipantId(_participantId);
        const signupRef = doc(dataBase, 'experiments', activeResearch, 'signups', _participantId);
        setManagerId(docResearch.data()?.user_id);
        const signupDoc = await getDoc(signupRef);
        if (signupDoc.exists()) {
          if (docResearch.data()?.researchType === 'QUICK') {
            // user is refilling the research -- think if we want to allow that
            setResearch(signupDoc.data()?.filledResearch);
            setTitle(docResearch.data()?.title);
          } else if (signupDoc.data()?.status === 'approved' && docResearch.data()?.status === 'started') {
            setImageUploadDescription(docResearch.data()?.description);
            setConsumerStage('ImageUpload');
          }
        } else {
          console.log('---1', docResearch.data()?.data);
          const a = {...groupRadioButtons(docResearch.data()?.data)};
          console.log('---2', a);
          setResearch(a);
          setTitle(docResearch.data()?.title);
        }
      } else {
        navigate(`/research/${activeResearch}`);
      }
    }

    if (!emailValidation(email) && email !== '') {
      navigate(`/research/${activeResearch}`);
    }

    fetchResearch();
  }, []);

  return (
    <div className={s.main}>
      {research && consumerStage === 'ResearchPreview'
        ? (
          <ResearchPreview
            research={research}
            isConsumer
            title={title}
            // eslint-disable-next-line no-unused-vars
            submitOnClick={async (filledResearch) => {
              let filedTypes = {};
              // eslint-disable-next-line guard-for-in
              for (const page in filledResearch) {
                const a = _.groupBy(filledResearch[page]?.content, (node) => node?.type);
                if (a) {
                  filedTypes = { ...filedTypes, ...a };
                }
              }

              // if (filedTypes[EDITOR_ELEMENTS_TYPES.IMAGE_UPLOADER]) {
              //   const path = `images/${managerId}/${activeResearch}/${participantId}/`;
              //   const listRef = ref(storage, path);

              //   // Find all the prefixes and items.
              //   listAll(listRef)
              //     .then((res) => {
              //       res.items.forEach((itemRef) => {
              //         const forestRef = ref(storage, itemRef.fullPath);

              //         // Create file metadata with property to delete
              //         const deleteMetadata = {
              //           customMetadata: null,
              //         };

              //         // Delete the metadata property
              //         updateMetadata(forestRef, deleteMetadata);
              //       // .then((metadata) => {
              //       //   debugger;
              //       //   // metadata.contentType should be null
              //       // }).catch((error) => {
              //       //   debugger;
              //       //   // Uh-oh, an error occurred!
              //       // });
              //       });
              //     });
              // // .catch((error) => {
              // //   // Uh-oh, an error occurred!
              // // });
              // }

              const dataBase = getDatabase();
              // Date.now() is the ID
              await setDoc(doc(dataBase, `experiments/${activeResearch}/signups`, participantId), {
                filledResearch,
                email,
                date: Date.now(),
              });
            }}
            conditionChanged={() =>{}}
            participantId={participantId}
            researchId={activeResearch}
            managerId={managerId}
          />
        ) : (consumerStage === 'ImageUpload'
          ? (
            <UploadImageResearchContent
              description={imageUploadDescription}
              participantId={participantId}
              researchId={activeResearch}
              managerId={managerId}
            />
          )
          : <div />)}
    </div>
  );
}

export default ConsumerResearchPreview;
