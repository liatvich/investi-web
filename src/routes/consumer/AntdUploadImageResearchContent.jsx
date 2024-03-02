// /* eslint-disable no-debugger */
// /* eslint-disable max-len */
// /* eslint-disable no-plusplus */
// /* eslint-disable no-loop-func */
// /* eslint-disable no-restricted-syntax */
// /* eslint-disable react/no-array-index-key */
// /* eslint-disable no-unused-vars */
// /* eslint-disable default-case */
// /* eslint-disable react/prop-types */
// /* eslint-disable react/jsx-no-comment-textnodes */
// /* eslint-disable no-nested-ternary */
// /* eslint-disable no-param-reassign */
// /*  eslint-disable-next-line react/prop-types  */

// import React, { useState } from 'react';
// import {
//   Typography,
//   LinearProgress,
// } from '@mui/material';
// import {
//   getStorage, ref, uploadBytesResumable, getDownloadURL,
// } from 'firebase/storage';
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, Space, Upload } from 'antd';
// import s from './UploadImageResearchContent.module.scss';

// export function AntdUploadImageResearchContent({
//   description, researchTitle, researchId, managerId,
// }) {
//   const [images, setImages] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [percentageCompleted, setPercentageCompleted] = useState(0);
//   // const maxNumber = 5;
//   // const onChange = (imageList) => {
//   //   // data for submit
//   //   setImages(imageList);
//   // };

//   // Create the file metadata
//   const metadata = {
//     contentType: 'image/jpeg',
//   };
//   // Upload file and metadata to the object 'images/mountains.jpg'
//   const storage = getStorage();

//   return (
//     <div className={s.root}>
//       <div className={s.innerContent}>
//         <div className={s.titleSection}>
//           <div className={s.back}>
//             <Typography variant="h5" component="div" className={s.title}>
//               Thank you for participating in
//               {' '}
//               {researchTitle}
//               {' '}
//               research!
//             </Typography>
//           </div>
//         </div>
//         <div className={s.content}>
//           <Typography variant="h5" gutterBottom component="div" className={s.description}>
//             {description}
//           </Typography>
//           {isUploading && (
//             <div className={s.uploadingProcessRoot}>
//               <Typography variant="h5" gutterBottom component="div" className={s.text}>
//                 Uploading Progress:
//               </Typography>
//               <LinearProgress variant="determinate" value={percentageCompleted} />
//             </div>
//           )}

//           <Space direction="vertical" style={{ width: '100%' }} size="large">
//             <Upload
//               action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
//               listType="picture"
//               maxCount={1} // I can control the number of images to be uploaded? from the outside?
//               multiple={false}
//               onChange={
//                 (info) => {
//                   setImages(info.file);
//                   debugger;
//                   let imageIndex = 1;
//                   for (const image of images) {
//                     const path = `images/${managerId}/${researchId}/${image?.file?.name}`;
//                     const storageRef = ref(storage, path);
//                     const uploadTask = uploadBytesResumable(storageRef, image?.file, metadata);

//                     // Listen for state changes, errors, and completion of the upload.
//                     uploadTask.on(
//                       'state_changed',
//                       (snapshot) => {
//                         // Get task progress, including the number of bytes
//                         // uploaded and the total number of bytes to be uploaded
//                         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                         setPercentageCompleted(
//                           (prevPercentageCompleted) => prevPercentageCompleted + progress / images.length,
//                         );

//                         // console.log(`Upload is ${progress}% done`);
//                         // switch (snapshot.state) {
//                         //   case 'paused':
//                         //     console.log('Upload is paused');
//                         //     break;
//                         //   case 'running':
//                         //     console.log('Upload is running');
//                         //     break;
//                         // }
//                       },
//                       (error) => {
//                         // A full list of error codes is available at
//                       },
//                       () => {
//                         setPercentageCompleted(
//                           (100 * imageIndex) / (images.length),
//                         );
//                         if (imageIndex === images.length) {
//                           setIsUploading(false);
//                         }
//                         imageIndex++;
//                         // Upload completed successfully, now we can get the download URL
//                         // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                         //   console.log('File available at', downloadURL);
//                         // });
//                       },
//                     );
//                   }
//                 }
//             }
//             >
//               <Button icon={<UploadOutlined />}>Upload</Button>
//             </Upload>
//           </Space>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AntdUploadImageResearchContent;
