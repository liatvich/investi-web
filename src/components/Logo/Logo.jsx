import React from 'react';
import Typography from '@mui/material/Typography';
import { Logo as LogoIcon } from '../../assets/logo';
import s from './Logo.module.scss';

export function Logo() {
  return (
    <div className={s.logo}>
      <LogoIcon className={s.icon} color="#104C43" />
      <Typography variant="subtitle1" component="div" className={s.text}>
        INVESTI PET
      </Typography>
    </div>
  );
}

export default Logo;
