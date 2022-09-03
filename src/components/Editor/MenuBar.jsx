/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import classNames from 'classnames';
import RedoIcon from '../../assets/icons/redoIcon.svg';
import UndoIcon from '../../assets/icons/undoIcon.svg';
import s from './MenuBar.module.scss';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

function MenuBar({
  editor, onAddPage, onDeletePage, totalPages,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [chosenTextStyle, setChosenTextStyle] = useState('Paragraph');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const textStyles = [{
    variant: 'h1',
    title: 'Heading 1',
    action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.isActive('heading', { level: 1 }),
  },
  {
    variant: 'h2',
    title: 'Heading 2',
    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.isActive('heading', { level: 2 }),
  },
  {
    variant: 'body1',
    title: 'Paragraph',
    action: () => editor.chain().focus().setParagraph().run(),
    isActive: () => editor.isActive('paragraph'),
  }];

  return (
    <div className={s.menu}>
      <div className={s.undoRedo}>
        <IconButton
          disableRipple
          onClick={() => editor.chain().focus().undo().run()}
          className={s.undo}
        >
          <img src={UndoIcon} alt="Undo" />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() => editor.chain().focus().undo().run()}
          className={s.redo}
        >
          <img src={RedoIcon} alt="Redo" />
        </IconButton>
      </div>
      <div className={s.textMenu}>
        <Button
          className={s.button}
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="text"
          size="large"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon sx={{ color: 'text.primary' }} />}
        >
          {chosenTextStyle}
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {
          textStyles.map(({
            title, action, isActive, variant,
          }) => (
            <MenuItem
              onClick={() => {
                action();
                handleClose();
                setChosenTextStyle(title);
              }}
              disableRipple
              selected={isActive()}
            >
              <Typography variant={variant} component="div">
                {title}
              </Typography>
            </MenuItem>
          ))
          }
        </StyledMenu>
      </div>
      <div className={s.listsSection}>
        <IconButton
          disableRipple
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={classNames({
            [s.selected]: editor.isActive('bulletList'),
          })}
        >
          <FormatListBulletedIcon sx={{ color: 'text.primary' }} />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={classNames({
            [s.selected]: editor.isActive('orderedList'),
          })}
        >
          <FormatListNumberedIcon sx={{ color: 'text.primary' }} />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() => editor.chain().focus().toggleValidationCheckbox().run()}
          className={classNames({
            [s.selected]: editor.isActive('validationCheckbox'),
          })}
        >
          <CheckBoxOutlinedIcon sx={{ color: 'text.primary' }} />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() => editor.chain().focus().toggleTextbox().run()}
          className={classNames({
            [s.selected]: editor.isActive('textbox'),
          })}
        >
          <DriveFileRenameOutlineOutlinedIcon sx={{ color: 'text.primary' }} />
        </IconButton>
      </div>
      <div className={s.media}>
        <IconButton
          disableRipple
          onClick={() => {
            // eslint-disable-next-line no-alert
            const url = window.prompt('Image URL');

            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <ImageOutlinedIcon sx={{ color: 'text.primary' }} />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() => {
            // eslint-disable-next-line no-alert
            const url = window.prompt('Video URL');

            if (url) {
              editor.chain().focus().setExternalVideo({ src: url }).run();
            }
          }}
        >
          <VideocamOutlinedIcon sx={{ color: 'text.primary' }} />
        </IconButton>
      </div>
      <div className={s.pageAction}>
        <IconButton
          disableRipple
          onClick={onAddPage}
        >
          <PostAddOutlinedIcon sx={{ color: 'text.primary' }} />
        </IconButton>
        <IconButton
          disableRipple
          onClick={onDeletePage}
          disabled={totalPages === 1}
        >
          <DeleteSweepOutlinedIcon
            className={classNames({
              [s.disabled]: totalPages === 1,
              [s.icon]: true,
            })}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default MenuBar;
