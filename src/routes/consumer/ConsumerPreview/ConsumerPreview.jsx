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
import { Logo } from '../../../components/Logo';
import { TextFieldMuiStyle } from '../../../common/styleConsts';
import { EmailTextbox } from '../../../components/EmailTextbox';

const CssTextField = styled(TextField)(TextFieldMuiStyle);

export function ConsumerPreview() {
  const [researchCode, setResearchCode] = useState('');
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState({ email: '', isValid: false });
  const navigate = useNavigate();
  const { getDatabase } = useDatabase();

  const start = async () => {
    if (researchCode === '') {
      setIsError(true);
      return;
    }
    if (!email.isValid) {
      return;
    }

    const dataBase = getDatabase();
    const docRef = doc(dataBase, 'experiments', researchCode);
    const docResearch = await getDoc(docRef);

    if (docResearch.exists() && docResearch.data()?.data?.[0]) {
      navigate(`${researchCode}`);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={s.root}>
      <Logo />
      <div className={s.content}>
        <Typography variant="h5" gutterBottom component="div" className={s.title}>
          Please enter research code
        </Typography>
        <div className={s.box}>
          <Typography variant="subtitle1" gutterBottom component="div" className={s.boxtitle}>
            Research Code
          </Typography>
          <CssTextField
            placeholder="research code"
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
          <Typography variant="subtitle1" gutterBottom component="div" className={s.boxtitle}>
            Email
          </Typography>
          <EmailTextbox
            className={s.textfield}
            onEmailChange={
              (currEmail, isCurrEmailValid) => {
                setEmail({ email: currEmail, isValid: isCurrEmailValid });
              }
            }
          />
          <Button
            disableRipple
            variant="contained"
            onClick={start}
            className={s.submit}
          >
            {'Let\'s go'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConsumerPreview;
