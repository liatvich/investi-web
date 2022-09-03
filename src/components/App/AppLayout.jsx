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
};

// eslint-disable-next-line react/prop-types, no-unused-vars
export function AppLayout({ children }) {
  const [step, setStep] = useState(Steps.LIST);
  const [participantsData, setParticipantsData] = useState({});

  return (
    <div className={s.main}>
      <TopBar className={s.topBar} />
      <div className={s.content}>
        {
          (step === Steps.LIST && (
            <ActiveResearch
              createResearch={() => setStep(Steps.CREATE)}
              participantsSelected={(currParticipantsData) => {
                setParticipantsData(currParticipantsData);
                setStep(Steps.PARTICIPANTS);
              }}
            />
          ))
          || (step === Steps.CREATE
            && (<CreateExperiment onComplete={() => { setStep(Steps.LIST); }} />))
          || (step === Steps.PARTICIPANTS
            && (
            <Participants
              createResearch={() => setStep(Steps.CREATE)}
              back={() => setStep(Steps.LIST)}
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
