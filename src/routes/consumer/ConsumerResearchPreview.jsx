/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc, getDoc, setDoc,
} from 'firebase/firestore/lite';
import {
  getStorage, ref, listAll, updateMetadata,
} from 'firebase/storage';
import _ from 'lodash';
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
  const [storage, setStorage] = useState(null);

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
        setManagerId(docResearch.data()?.user_id);
        const signupDoc = await getDoc(signupRef);
        if (signupDoc.exists()) {
          if (docResearch.data()?.researchType === 'QUICK') {
            // user is refilling the research -- think if we want to allow that
            setResearch({ ...groupRadioButtons(docResearch.data()?.data) });
            setTitle(docResearch.data()?.title);
          } else if (signupDoc.data()?.status === 'approved' && docResearch.data()?.status === 'started') {
            setImageUploadDescription(docResearch.data()?.description);
            setConsumerStage('ImageUpload');
          }
        } else {
          // eslint-disable-next-line no-underscore-dangle
          const _storage = getStorage();
          setStorage(_storage);

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
              let filedTypes = {};
              // eslint-disable-next-line guard-for-in
              for (const page in filledResearch) {
                const a = _.groupBy(filledResearch[page]?.content, (node) => node?.type);
                if (a) {
                  filedTypes = { ...filedTypes, ...a };
                }
              }

              if (filedTypes[EDITOR_ELEMENTS_TYPES.IMAGE_UPLOADER]) {
                const path = `images/${managerId}/${activeResearch}/${email}/`;
                const listRef = ref(storage, path);

                // Find all the prefixes and items.
                listAll(listRef)
                  .then((res) => {
                    res.items.forEach((itemRef) => {
                      const forestRef = ref(storage, itemRef.fullPath);

                      // Create file metadata with property to delete
                      const deleteMetadata = {
                        customMetadata: null,
                      };

                      // Delete the metadata property
                      updateMetadata(forestRef, deleteMetadata);
                    // .then((metadata) => {
                    //   debugger;
                    //   // metadata.contentType should be null
                    // }).catch((error) => {
                    //   debugger;
                    //   // Uh-oh, an error occurred!
                    // });
                    });
                  });
              // .catch((error) => {
              //   // Uh-oh, an error occurred!
              // });
              }

              const dataBase = getDatabase();
              await setDoc(doc(dataBase, `experiments/${activeResearch}/signups`, email), {
                filledResearch,
                email,
                date: Date.now(),
              });
            }}
            participantEmail={email}
            researchId={activeResearch}
            managerId={managerId}
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
