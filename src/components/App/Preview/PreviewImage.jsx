/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

import {
  getStorage, ref, getDownloadURL,
} from 'firebase/storage';

export function PreviewImage({ node }) {
  const [imagePath, setImagePath] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (imagePath) {
      const storage = getStorage();
      getDownloadURL(ref(storage, imagePath))
        .then((url) => {
          setImageUrl(url);
        });
    }
  }, [imagePath]);

  useEffect(() => {
    setImagePath(node?.attrs?.filePath);
  }, [node]);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    imageUrl ? <img src={imageUrl} style={{ objectFit: 'scale-down' }} /> : <div />
  );
}

export default PreviewImage;
