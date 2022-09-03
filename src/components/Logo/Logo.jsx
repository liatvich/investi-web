import React from 'react';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import { Logo as LogoIcon } from '../../assets/logo';
import s from './Logo.module.scss';
import hunter from '../../assets/hunter.png';
import tech4animals from '../../assets/Logo-4site.png';

// eslint-disable-next-line react/prop-types
export function Logo({ withoutPaddingTop, color }) {
  return (
    <div
      className={classNames({
        [s.logo]: true,
        [s.paddingTop]: !withoutPaddingTop,
      })}
    >
      <LogoIcon className={s.icon} color={color || '#104C43'} />
      <div className={s.separator} style={{ background: color || '#104C43' }} />
      <img src={tech4animals} alt="tech4animals" className={s.image} />
      <div className={s.separator} style={{ background: color || '#104C43' }} />
      <img src={hunter} alt="hunter" className={s.image} />
      <Typography variant="subtitle1" component="div" className={s.text} style={{ color: color || '#104C43' }}>
        INVESTI PET
      </Typography>
    </div>
  );
}

export default Logo;
