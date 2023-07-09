/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import './ImageUploader.scss';
import { Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from '@mui/icons-material/Done';

import {
  getStorage, ref, uploadBytesResumable,
} from 'firebase/storage';

function ImageUploader(props) {
  const {
    disabled = true,
    managerId = '',
    researchId = '',
    participantEmail = '',
    node,
  } = props;

  const [image, setImage] = useState(null);
  const [storage, setStorage] = useState(null);
  const [isUploading, setIsUploading] = useState(null);
  const [isUploadFailed, setIsUploadFailed] = useState(null);
  const [currDisabled, setCurrDisabled] = useState(disabled);
  const [isUploaded, setIsUploaded] = useState(disabled);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const _storage = getStorage();
    setStorage(_storage);
  }, []);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      const imageUrl = URL.createObjectURL(img);
      setImage({ imageUrl, file: img });
    }
  };

  // Create the file metadata
  const metadata = {
    contentType: 'image/jpeg',
    customMetadata: { expiry: new Date(Date.now() + 30 * 60000).toUTCString() },
  };

  const uploadImage = () => {
    if (!currDisabled) {
      const path = `images/${managerId}/${researchId}/${participantEmail}/${image?.file?.name}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, image?.file, metadata);

      // Listen for state changes, errors, and completion of the upload.

      // onChange={(event) => {
      //   // eslint-disable-next-line no-param-reassign
      //   if (node?.attrs) {
      //     // eslint-disable-next-line no-param-reassign
      //     node.attrs.value = event.target.value;
      //   }
      //   setValue(event.target.value);
      // }}

      uploadTask.on(
        'state_changed',
        () => {
          setIsUploading(true);
          setCurrDisabled(true);
        },
        () => {
          setIsUploading(false);
          setIsUploadFailed(true);
          setCurrDisabled(false);
        },
        () => {
          // eslint-disable-next-line no-param-reassign
          if (node?.attrs) {
            node.attrs.filePath = path;
          }

          setIsUploading(false);
          setIsUploadFailed(false);
          setCurrDisabled(true);
          setIsUploaded(true);
        },
      );
    }
  };

  const onImageRemove = () => {
    setImage(null);
    setIsUploadFailed(false);
  };

  return (
    <NodeViewWrapper>
      <div suppressContentEditableWarning className="content" contentEditable="false">
        {image && <img src={image.imageUrl} className="image" />}
        <Button
          disableRipple
          variant="contained"
          disabled={currDisabled}
          sx={{
            background: '#104C43',
            borderRadius: '8px',
            color: '#FFFFFF',
            '&:hover': {
              background: '#1D8A7A',
            },
          }}
          component="label"
        >
          { image ? 'Change Image' : 'Upload Image' }
          <input hidden accept="image/*" type="file" disabled={currDisabled} onChange={onImageChange} />
        </Button>
        { image
        && (
          <div className="delete">
            <IconButton
              onClick={onImageRemove}
              disabled={currDisabled}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        { image
        && (
        <IconButton
          onClick={uploadImage}
          disabled={currDisabled}
        >
          {isUploading ? <CircularProgress color="info" size={20} />
            : isUploaded ? <DoneIcon color="success" /> : <UploadIcon className="done" />}
        </IconButton>
        )}
        { image && isUploadFailed && (
        <Typography variant="subtitle1" component="div" className="failed">
          <div className="failedDiv">Upload failed please try again</div>
        </Typography>
        )}
      </div>
    </NodeViewWrapper>
  );
}

export default ImageUploader;
