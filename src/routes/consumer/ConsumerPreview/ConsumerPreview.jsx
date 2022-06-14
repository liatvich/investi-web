import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  doc, getDoc,
} from 'firebase/firestore/lite';
import { useDatabase } from '../../../Hooks';

export function ConsumerPreview() {
  const [researchCode, setResearchCode] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { getDatabase } = useDatabase();

  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        Please Enter Research Number:
      </Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={researchCode}
        onChange={(event) => {
          if (isError) {
            setIsError(false);
          }
          setResearchCode(event.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={async () => {
          const dataBase = getDatabase();
          const docRef = doc(dataBase, 'experiments', researchCode);
          const docResearch = await getDoc(docRef);

          if (docResearch.exists() && docResearch.data()?.data?.['0']) {
            navigate(`${researchCode}`);
          } else {
            setIsError(true);
          }
        }}
      >
        Subscribe
      </Button>
      {isError
            && (
            <Typography variant="h5" gutterBottom component="div">
              Error
            </Typography>
            )}

    </div>
  );
}

export default ConsumerPreview;
