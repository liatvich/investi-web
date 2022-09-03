// Import FirebaseAuth and firebase.
import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { ActiveResearch } from '../../routes/manager/ActiveResearch';
import { CreateExperiment } from '../../routes/manager/CreateExperiment';
import { Participants } from '../../routes/manager/Participants';
import s from './AppLayout.module.scss';

const Steps = {
  CREATE: 'CREATE',
  LIST: 'LIST',
  PARTICIPANTS: 'PARTICIPANTS',
  EDIT: 'EDIT',
};

// eslint-disable-next-line react/prop-types, no-unused-vars
export function AppLayout({ children }) {
  const [step, setStep] = useState({ id: Steps.LIST, data: {} });
  const [participantsData, setParticipantsData] = useState({});

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
            />
          ))
          || (step.id === Steps.CREATE
            && (<CreateExperiment onComplete={() => { setStep({ id: Steps.LIST, data: {} }); }} />))
          || (step.id === Steps.EDIT
            && (
            <CreateExperiment
              onComplete={() => { setStep({ id: Steps.LIST, data: {} }); }}
              updateResearchId={step?.data?.updateResearchId}
              title={step?.data?.title}
              researchJson={step?.data?.researchJson}
            />
            ))
          || (step.id === Steps.PARTICIPANTS
            && (
            <Participants
              createResearch={() => setStep({ id: Steps.CREATE, data: {} })}
              back={() => setStep({ id: Steps.LIST, data: {} })}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...participantsData}
            />
            ))
        }
      </div>
    </div>
  );
}

export default AppLayout;
