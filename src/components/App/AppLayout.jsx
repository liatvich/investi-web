// Import FirebaseAuth and firebase.
import React from 'react';
import { SideBar } from './SideBar';
import { TopBar } from './TopBar';
import s from './AppLayout.module.scss';

// eslint-disable-next-line react/prop-types
export function AppLayout({ children }) {
  return (
    <div className={s.main}>
      <SideBar />
      <div className={s.right_side}>
        <TopBar className={s.topBar} />
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
