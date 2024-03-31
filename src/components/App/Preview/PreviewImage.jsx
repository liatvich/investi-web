/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

// const S3_BUCKET_NAME = 'pets-data-lab-storage';
// const S3_BUCKET_REGION = 'eu-north-1';
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_KEY;

////// AAAAAA wha
export function PreviewImage({ node }) {
  const [imagePath, setImagePath] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (imagePath !== null) {
      // eslint-disable-next-line no-debugger
      // debugger;
      AWS.config.update({
        accessKeyId,
        secretAccessKey,
      });

      // const petsDataLabBucket = new AWS.S3({
      //   params: { Bucket: S3_BUCKET_NAME },
      //   region: S3_BUCKET_REGION,
      // });

      // const params = {
      //   Bucket: S3_BUCKET_NAME,
      //   Key: imagePath,
      // };

      // WORKS NOT GGOOD±±!!
      const url = ''; // petsDataLabBucket.getSignedUrl('getObject', params);
      setImageUrl(url);
    }
  }, [imagePath]);

  useEffect(() => {
    setImagePath(node?.attrs?.filePath);
  }, [node]);

  return (
    imageUrl
      ? (
        <img src={imageUrl} style={{ objectFit: 'scale-down' }} />
      ) : <div />
  );
}

export default PreviewImage;
