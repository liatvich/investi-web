/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import './ImageUploader.scss';
import AWS from 'aws-sdk';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';

const S3_BUCKET_NAME = 'pets-data-lab-storage';
const S3_BUCKET_REGION = 'eu-north-1';
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_KEY;

function ImageUploader(props) {
  const {
    disabled = true,
    managerId = '',
    researchId = '',
    participantEmail = 'testMail@test.com',
    node,
  } = props;

  const [fileList, setFileList] = useState([]);
  const [currDisabled, setCurrDisabled] = useState(disabled);
  const [petsDataLabBucket, setPetsDataLabBucket] = useState(null);

  useEffect(() => {
    AWS.config.update({
      accessKeyId,
      secretAccessKey,
    });

    const newBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET_NAME },
      region: S3_BUCKET_REGION,
    });

    setPetsDataLabBucket(newBucket);
  }, []);

  const getFilePath = (file) => `images/${managerId}/${researchId}/${participantEmail}/${file?.name}`;

  const onImageChange = (event) => {
    if (event.fileList && event.fileList[0]) {
      setFileList((currentFileList) => [...currentFileList, ...event.fileList]);
    }
  };

  const onImageRemove = (file) => {
    if (!currDisabled) {
      const params = {
        Bucket: S3_BUCKET_NAME,
        Key: getFilePath(file),
      };

      petsDataLabBucket.deleteObject(params, (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err, err.stack); // error
        else {
          setFileList((currentFileList) => currentFileList.filter((f) => f.name !== file.name));
        }
      });
    }
  };

  const changeFileStatus = (file, status, uploadPresents) => {
    const currFile = fileList.find((f) => f.uid === file.uid);
    currFile.status = status;
    if (status === 'uploading') {
      currFile.percent = uploadPresents;
    }
    setFileList([...fileList]);
  };

  const customRequest = ({ file }) => {
    if (!currDisabled) {
      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET_NAME,
        Key: getFilePath(file),
      };

      petsDataLabBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          setCurrDisabled(true);
          changeFileStatus(file, 'uploading', Math.round((evt.loaded / evt.total) * 100));
          if (evt.loaded === evt.total) {
            changeFileStatus(file, 'done');
            setCurrDisabled(false);

            // eslint-disable-next-line no-param-reassign
            if (node?.attrs) {
              node.attrs.filePath = getFilePath(file);
            }
          }
        })
        .send((err) => {
          if (err) {
            changeFileStatus(file, 'error');
            setCurrDisabled(false);
          }
        });
    }
  };

  return (
    <NodeViewWrapper>
      <div suppressContentEditableWarning className="content" contentEditable="false">
      <NodeViewContent />
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Upload
            listType="picture"
            maxCount={1}
            customRequest={customRequest}
            onChange={onImageChange}
            fileList={fileList}
            onRemove={onImageRemove}
          >
            <Button icon={<UploadOutlined />} disabled={currDisabled}>Upload</Button>
          </Upload>
        </Space>
      </div>
    </NodeViewWrapper>
  );
}

export default ImageUploader;
