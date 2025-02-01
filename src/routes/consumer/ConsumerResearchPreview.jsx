/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc, getDoc, setDoc, getDocs, query, collection, where, documentId
} from 'firebase/firestore/lite';
import _, { map } from 'lodash';
import { EDITOR_ELEMENTS_TYPES } from '../../common/consts';
import { Logo } from '../../components/Logo/Logo.jsx';
import { useDatabase } from '../../Hooks';
import { ResearchPreview } from '../../components/App/Preview/ResearchPreview';
import { Button, Typography } from '@mui/material';
import { emailValidation } from '../../common/general';
import { UploadImageResearchContent } from './UploadImageResearchContent';
import s from './ConsumerResearchPreview.module.scss';

export function ConsumerResearchPreview() {
  const { activeResearch,email: paramMail} = useParams();
  const { getDatabase } = useDatabase();
  const navigate = useNavigate();
  const [research, setResearch] = useState(null);
  const [title, setTitle] = useState('');
  const [submitText, setSubmitText] = useState('');
  const [managerId, setManagerId] = useState('');
  const [imageUploadDescription, setImageUploadDescription] = useState('');
  const [consumerStage, setConsumerStage] = useState('ResearchPreview');
  // const [participantId, setParticipantId] = useState('');
  const [chooseNewOrExisting, setChooseNewOrExisting] = useState('NOT SET');
  const [email, setEmail] = useState(paramMail);
  const [trails, setTrails] = useState([]);
  const [docResearch, setDocResearch] = useState({});
  const [noTrailsVersion, setNoTrailsVersion] = useState(true);


  const groupConditionalContentRadioButtons = (conditionalNode, contentId) => {
    const newConditionalNode = conditionalNode?.content?.reduce(
      (acc, node, index) => {
        if (node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON || node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_RADIO_BUTTON || node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_SCORE) {
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
    return {type: EDITOR_ELEMENTS_TYPES.CONDITIONAL_CONTENT,
      content: newConditionalNode.goingArray,
      contentId: newConditionalNode.contentId,
    };
  };


  const groupRadioButtons = (researchData) => Object.values(researchData)?.map(
    (page) => page?.content?.reduce(
      (acc, node, index) => {
        if (node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON || node.type === EDITOR_ELEMENTS_TYPES.CONDITIONAL_RADIO_BUTTON || node.type === EDITOR_ELEMENTS_TYPES.RADIO_BUTTON_SCORE) {
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

  const yalla = () => {
    setChooseNewOrExisting('YALLA');
    setTrails([]);
  }

  const startNewResearch = (inputDocResearch = docResearch) => {
        const a = {...groupRadioButtons(inputDocResearch.data()?.data)};
        setResearch(a);
        yalla();
  }

  useEffect(() => {
    async function fetchResearch() {
      const dataBase = getDatabase();
      const docRef = doc(dataBase, 'experiments', activeResearch);
      const docResearch = await getDoc(docRef);
      setDocResearch(docResearch);
      if (docResearch.exists() && docResearch.data()?.data) {
        if (!docResearch.data()?.researchType === 'QUICK' && !emailValidation(email)) {
          navigate(`/research/${activeResearch}`);
        }
        setManagerId(docResearch.data()?.user_id);
        setTitle(docResearch.data()?.title);
        setSubmitText(docResearch.data()?.submitText);

        /////
        // Check if there are several signups with the same email
        // const _participantId = email;
        // can be removed
        // setParticipantId(_participantId);
        var strSearch = email;
        var strLength = strSearch.length;
        var strFrontCode = strSearch.slice(0, strLength-1);
        var strEndCode = strSearch.slice(strLength-1, strSearch.length);
  
        var startcode = strSearch;
        var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

        const dataBase = getDatabase();
        const docRef = query(collection(dataBase, 'experiments', activeResearch, 'signups'),
        where(documentId(), '>=', startcode), where(documentId(), '<', endcode));
        const docsResearch = await getDocs(docRef);

        const docsData = docsResearch?.docs?.sort((a, b) => a.date - b.date)
        .map(
          (currDoc) =>  currDoc.data()
        );
        setTrails(docsData);

        // console.log('-------', docsData);
        ///////


        // const _participantId = email;
        // setParticipantId(_participantId);
        // const signupRef = doc(dataBase, 'experiments', activeResearch, 'signups', _participantId);
        // const signupDoc = await getDoc(signupRef);


        if (docsResearch.docs.length > 0) {

          setChooseNewOrExisting('NEET TO CHOOSE')

          if (noTrailsVersion) {
            setEmail(paramMail +'_' + docsData?.length);
            startNewResearch(docResearch);
          }


          // if (docResearch.data()?.researchType === 'QUICK') {
            // // user is refilling the research -- think if we want to allow that

            // setResearch(signupDoc.data()?.filledResearch);
            // setTitle(docResearch.data()?.title);
          //   // NEED TO DELETE THIS ALL ARE QUICK RESEARCHES
          // } else if (signupDoc.data()?.status === 'approved' && docResearch.data()?.status === 'started') {
          //   setImageUploadDescription(docResearch.data()?.description);
          //   setConsumerStage('ImageUpload');
          // }
        } else {
          startNewResearch(docResearch);
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

  const fillAnotherResearch = async ()=>{
    var strSearch = paramMail;
    var strLength = strSearch.length;
    var strFrontCode = strSearch.slice(0, strLength-1);
    var strEndCode = strSearch.slice(strLength-1, strSearch.length);

    var startcode = strSearch;
    var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

    const dataBase = getDatabase();
    const docRef = query(collection(dataBase, 'experiments', activeResearch, 'signups'),
    where(documentId(), '>=', startcode), where(documentId(), '<', endcode));
    const docsResearch = await getDocs(docRef);

    const docsData = docsResearch?.docs?.sort((a, b) => a.date - b.date)
    .map(
      (currDoc) =>  currDoc.data()
    );
    setTrails(docsData);
    setEmail(paramMail +'_' + docsData?.length);
    startNewResearch();
  }

  return (
    <div className={s.main}>
      {
        chooseNewOrExisting === 'NEET TO CHOOSE'
        && (
          <div className={s.chooseRoot}>
          <Logo />
          <div className={s.chooseContent}>
          <div className={s.chooseBox}>
            <Button
              disableRipple
              className={s.submit}
              onClick={() => {
                setEmail(paramMail +'_' + trails?.length);
                startNewResearch();
              }}
            >
              {'Fill New Research Form'}
            </Button>
            <Typography variant="subtitle1" component="div" className={s.chooseBoxTitle}>
              Continue with existing filled forms: 
            </Typography>
            {trails?.map(({email: trailMail, filledResearch}, index) => (
              <Button
                disableRipple
                className={s.submit}
                onClick={() => {
                  setEmail(trailMail);
                  setResearch(filledResearch);
                  yalla();
                }}
                key={trailMail}
              > {`${index + 1} trail`}
              </Button>)
            )}
            </div>
          </div>
          </div>
        )
      }
      {research && consumerStage === 'ResearchPreview' & chooseNewOrExisting === 'YALLA'
        ? (
          <ResearchPreview
            research={research}
            isConsumer
            title={title}
            submitText={submitText}
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
              await setDoc(doc(dataBase, `experiments/${activeResearch}/signups`, email), {
                filledResearch,
                email,
                date: Date.now(),
              });
            }}
            conditionChanged={() =>{}}
            participantId={email}
            researchId={activeResearch}
            managerId={managerId}
            fillAnotherResearch={fillAnotherResearch}
          />
        ) : (consumerStage === 'ImageUpload'
          ? (
            <UploadImageResearchContent
              description={imageUploadDescription}
              participantId={email}
              researchId={activeResearch}
              managerId={managerId}
            />
          )
          : <div />)}
    </div>
  );
}

export default ConsumerResearchPreview;
