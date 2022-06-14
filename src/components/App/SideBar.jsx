/* eslint-disable global-require */
// Import FirebaseAuth and firebase.
import React from 'react';
// import Button from '@mui/material/Button';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
// import { Settings } from '@mui/icons-material'
// import BookmarkAddedTwoToneIcon from '@mui/icons-material/BookmarkAddedTwoTone';
import BiotechTwoToneIcon from '@mui/icons-material/BiotechTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import Settings from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import s from './SideBar.module.scss';
import { SideBarMenuItem } from './SideBarMenuItem';
import { routes } from '../../routes/manager';

export function SideBar() {
  const navigate = useNavigate();
  return (
    <div className={s.sidebar}>
      <img className={s.logo} src={require('../../Resources/Logo2.png')} alt="Logo" />
      <div className={s.sidebar_actions}>
        <SideBarMenuItem icon={<AddCircleTwoToneIcon />} text="create" onClick={() => navigate(`/${routes.CREATE_EXPERIMENT}`)} />
        <SideBarMenuItem icon={<ModeEditOutlineTwoToneIcon />} text="draft" />
        <SideBarMenuItem icon={<ListAltTwoToneIcon />} text="list" onClick={() => navigate(`/${routes.ACTIVE}`)} />
        <SideBarMenuItem icon={<BiotechTwoToneIcon />} text="complete" isSelected />
      </div>
      <div className={s.settings}>
        <IconButton size="large">
          <Settings />
        </IconButton>
      </div>
    </div>
  );
}

export default SideBar;
