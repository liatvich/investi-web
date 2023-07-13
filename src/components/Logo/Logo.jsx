import React from 'react';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';
import { LogoNew as LogoIcon } from '../../assets/logonew';
import s from './Logo.module.scss';
import tech4animals from '../../assets/Logo-4site.png';

// eslint-disable-next-line react/prop-types
export function Logo({ withoutPaddingTop, color }) {
  return (
    <div
      className={classNames({
        [s.logo]: true,
        [s.paddingTop]: !withoutPaddingTop,
        [s.top]: true,
      })}
    >
      <LogoIcon className={s.icon} color={color || '#104C43'} />
      <Typography variant="subtitle1" component="div" className={s.text} style={{ color: '#1f1f1f' }}>
        pets
      </Typography>
      <Typography variant="subtitle1" component="div" className={s.text} style={{ color: '#3D67F3' }}>
        data
      </Typography>
      <Typography variant="subtitle1" component="div" className={s.text} style={{ color: '#1f1f1f' }}>
        lab
      </Typography>
      <div className={s.contributes}>
        <img src={tech4animals} alt="tech4animals" className={s.image} />
      </div>
    </div>
  );
}

export default Logo;
