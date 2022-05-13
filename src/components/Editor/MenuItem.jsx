/* eslint-disable react/prop-types */
import React from 'react';
import './MenuItem.scss';
import Button from '@mui/material/Button';

function MenuItem({
  title, action, isActive = null,
}) {
  return (
    <Button
      className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
      onClick={action}
      variant="outlined"
      style={{
        // textTransform: 'lowercase',
        // whiteSpace: 'nowrap',
        // minWidth: 'auto',
        width: 'auto',
      }}
    >
      {title}
    </Button>
  );
}

export default MenuItem;
