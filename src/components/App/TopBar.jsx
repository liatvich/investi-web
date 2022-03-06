/* eslint-disable global-require */
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DoorBackTwoToneIcon from '@mui/icons-material/DoorBackTwoTone';
import s from './TopBar.module.scss';
import { useProvideAuth } from '../../Hooks';

export function TopBar() {
  const { user, signout } = useProvideAuth();
  return (
    <div className={s.topbar}>
      <Typography variant="h5" gutterBottom component="div" className={s.username}>
        { user ? user.displayName : ''}
      </Typography>
      <Button
        startIcon={<DoorBackTwoToneIcon />}
        onClick={signout}
      >
        logout
      </Button>
    </div>
  );
}

export default TopBar;
