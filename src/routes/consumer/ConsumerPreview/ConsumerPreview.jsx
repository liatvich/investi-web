import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  doc, getDoc,
} from 'firebase/firestore/lite';
import { styled } from '@mui/material/styles';
import { useDatabase } from '../../../Hooks';
import s from './ConsumerPreview.module.scss';
import { Logo } from '../../../assets/logo';

const CssTextField = styled(TextField)({
  '.MuiTextField-root': {
    borderColor: '#104C43',
  },
  '& label.Mui-focused': {
    color: '#104C43',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#104C43',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#104C43',
    },
    '&:hover fieldset': {
      borderColor: '#104C43',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#104C43',
    },
  },
});

export function ConsumerPreview() {
  const [researchCode, setResearchCode] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { getDatabase } = useDatabase();

  const start = async () => {
    const dataBase = getDatabase();
    const docRef = doc(dataBase, 'experiments', researchCode);
    const docResearch = await getDoc(docRef);

    if (docResearch.exists() && docResearch.data()?.data?.['1']) {
      navigate(`${researchCode}`);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={s.root}>
      <div className={s.logo}>
        <Logo className={s.icon} color="#104C43" />
        <Typography variant="subtitle1" component="div" className={s.text}>
          INVESTI PET
        </Typography>
      </div>
      <div className={s.content}>
        <Typography variant="h5" gutterBottom component="div" className={s.title}>
          Please enter research number:
        </Typography>
        <div className={s.box}>
          <Typography variant="subtitle1" gutterBottom component="div" className={s.boxtitle}>
            Research Code:
          </Typography>

          <CssTextField
            placeholder="Example"
            id="custom-css-outlined-input"
            value={researchCode}
            className={s.textfield}
            key="researchCode"
            onChange={(event) => {
              setResearchCode(event.target.value);
              setIsError(false);
            }}
            error={isError}
          />
          {isError
            ? (
              <Typography variant="caption" component="div" className={s.error}>
                Please enter correct research code
              </Typography>
            ) : <div className={s.emptyError} />}
          <Button
            variant="contained"
            onClick={start}
            className={s.submit}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConsumerPreview;
