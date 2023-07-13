/* eslint-disable react/prop-types */
import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function RoundButton({
  width,
  height,
  arrowWidth,
  arrowHeight,
  onClick,
  isBack,
}) {
  const IconRoundButton = styled(IconButton)({
    width,
    height,
    background: 'rgba(16, 76, 67, 0.1)',
    alignSelf: 'center',
  });

  const ArrowIconStyle = {
    width: arrowWidth,
    height: arrowHeight,
    color: '#2C3D8F',
  };

  return (
    <IconRoundButton
      disableRipple
      onClick={onClick}
    >
      {isBack
        ? <ArrowBackIosIcon sx={ArrowIconStyle} />
        : <ArrowForwardIosIcon sx={ArrowIconStyle} /> }
    </IconRoundButton>
  );
}

export default RoundButton;
