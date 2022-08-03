// Import FirebaseAuth and firebase.
import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { ActiveResearch } from '../../routes/manager/ActiveResearch';
import s from './AppLayout.module.scss';

const Steps = {
  CREATE: 'CREATE',
  LIST: 'LIST',
};

// eslint-disable-next-line react/prop-types
export function AppLayout({ children }) {
  const [step, setStep] = useState(Steps.LIST);

  return (
    <div className={s.main}>
      <TopBar className={s.topBar} />
      <div className={s.content}>
        {
          step === Steps.LIST && (
            <ActiveResearch />
          )
        }
      </div>
    </div>
  );
}

export default AppLayout;
