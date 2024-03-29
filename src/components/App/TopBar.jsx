/* eslint-disable global-require */
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  IconButton, Avatar, Menu, MenuItem,
} from '@mui/material';
import s from './TopBar.module.scss';
import { useProvideAuth } from '../../Hooks';
import { Logo } from '../Logo';

export function TopBar() {
  const { user, signout } = useProvideAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  return (
    <div className={s.topbar}>
      <Logo withoutPaddingTop />
      <div className={s.avatar}>
        <Avatar src={user?.photoURL || ''} />
        <IconButton onClick={handleClick} disableRipple>
          <KeyboardArrowDownIcon />
        </IconButton>
        <Menu
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={signout}>signout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default TopBar;
