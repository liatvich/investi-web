/* eslint-disable react/prop-types */
// Import FirebaseAuth and firebase.
import React from 'react';
import Button from '@mui/material/Button';
// import * as s from './SideBarMenuItem.module.scss';

export function SideBarMenuItem({
  icon,
  onClick = () => {},
  isSelected = false,
  text,
}) {
  return (
    <div>
      <Button
        variant={isSelected ? 'outlined' : 'text'}
        startIcon={icon}
        size="large"
        fullWidth
        sx={{
          focusVisible: isSelected,
        }}
        onClick={onClick}
      >
        {text}
      </Button>
    </div>
  );
}

export default SideBarMenuItem;
