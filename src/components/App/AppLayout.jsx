// Import FirebaseAuth and firebase.
import React, { useState } from 'react';
import {
  collection, addDoc, setDoc, doc,
} from 'firebase/firestore/lite';
import { TopBar } from './TopBar';
import { ActiveResearch } from '../../routes/manager/ActiveResearch';
import { CreateExperiment } from '../../routes/manager/CreateExperiment';
import { Participants } from '../../routes/manager/Participants';
import { Research } from '../../routes/manager/Research';
import { useDatabase, useProvideAuth } from '../../Hooks';
import s from './AppLayout.module.scss';

const Steps = {
  CREATE: 'CREATE',
  LIST: 'LIST',
  PARTICIPANTS: 'PARTICIPANTS',
  EDIT: 'EDIT',
  RESEARCH: 'RESEARCH',
};

// eslint-disable-next-line react/prop-types, no-unused-vars
export function AppLayout({ children }) {
  const [step, setStep] = useState({ id: Steps.LIST, data: {} });
  const [participantsData, setParticipantsData] = useState({});
  const { getDatabase } = useDatabase();
  const { user } = useProvideAuth();

  const onSaveResearch = async (experimentTitle, currentResearchJson, status) => {
    const dataBase = getDatabase();
    const experimentsRef = collection(dataBase, 'experiments');
    const experimentData = {
      user_id: user?.uid,
      title: experimentTitle,
      date: Date.now(),
      data: { ...currentResearchJson },
      status,
    };
    if (step?.data?.updateResearchId) {
      const participantRef = doc(dataBase, `experiments/${step?.data?.updateResearchId}`);
      await setDoc(participantRef, experimentData);
    } else {
      await addDoc(experimentsRef, experimentData);
    }
  };

  const startResearch = async (research, description) => {
    const dataBase = getDatabase();
    const researchRef = doc(dataBase, `experiments/${research?.id}`);
    const researchData = { ...research, description, status: 'started' };
    delete researchData.signups;
    delete researchData.actionsData;
    await setDoc(researchRef, researchData);
    return researchData;
  };

  return (
    <div className={s.main}>
      <TopBar className={s.topBar} />
      <div className={s.content}>
        {
          (step.id === Steps.LIST && (
            <ActiveResearch
              createResearch={() => setStep({ id: Steps.CREATE, data: {} })}
              participantsSelected={(currParticipantsData) => {
                setParticipantsData(currParticipantsData);
                setStep({ id: Steps.PARTICIPANTS, data: {} });
              }}
              onEditExperiment={
                (currEditExperimentData) => {
                  setStep({ id: Steps.EDIT, data: currEditExperimentData });
                }
              }
              onSetResearch={
                (research) => {
                  setStep({ id: Steps.RESEARCH, data: { research } });
                }
              }
            />
          ))
          || (step.id === Steps.CREATE
            && (
            <CreateExperiment
              onSaveResearch={onSaveResearch}
              onComplete={() => { setStep({ id: Steps.LIST, data: {} }); }}
            />
            )
          )
          || (step.id === Steps.EDIT
            && (
            <CreateExperiment
              onSaveResearch={onSaveResearch}
              onComplete={() => { setStep({ id: Steps.LIST, data: {} }); }}
              updateResearchId={step?.data?.updateResearchId}
              title={step?.data?.title}
              researchJson={step?.data?.researchJson}
            />
            ))
          || (step.id === Steps.PARTICIPANTS
            && (
            <Participants
              back={() => setStep({ id: Steps.LIST, data: {} })}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...participantsData}
            />
            ))
            || (step.id === Steps.RESEARCH
              && (
              <Research
                research={step?.data?.research}
                back={() => setStep({ id: Steps.LIST, data: {} })}
                participantsSelected={(currParticipantsData) => {
                  setParticipantsData(currParticipantsData);
                  setStep({ id: Steps.PARTICIPANTS, data: {} });
                }}
                startResearch={async (research, description) => {
                  const startedResearch = await startResearch(research, description);
                  setStep({ id: Steps.RESEARCH, data: { research: startedResearch } });
                }}
                saveResearchAsDraft={async (research, description) => {
                  const dataBase = getDatabase();
                  const researchRef = doc(dataBase, `experiments/${research?.id}`);
                  const researchData = { ...research, description };
                  delete researchData.signups;
                  delete researchData.actionsData;
                  await setDoc(researchRef, researchData);
                }}
              />
              ))
        }
      </div>
    </div>
  );
}

export default AppLayout;
