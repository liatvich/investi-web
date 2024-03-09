import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  doc, getDoc,
} from 'firebase/firestore/lite';
import { useDatabase } from '../../../Hooks';
import s from './ConsumerPreviewMailOnly.module.scss';
import { Logo } from '../../../components/Logo';
import { EmailTextbox } from '../../../components/EmailTextbox';


export function ConsumerPreviewMailOnly() {
  const [email, setEmail] = useState({ email: '', isValid: false });
  const { activeResearch } = useParams();
  const navigate = useNavigate();
  const { getDatabase } = useDatabase();
  const emailRef = useRef(null);

  useEffect(() => {
    const isResearchExists = async () => {
      if (activeResearch === '') {
        navigate(-1);
        return;
      }

      const dataBase = getDatabase();
      const docRef = doc(dataBase, 'experiments', activeResearch);
      const docResearch = await getDoc(docRef);


      if (!(docResearch.exists() && docResearch.data()?.data?.[0])) {
        navigate(-1);
      }
    };

    isResearchExists()
  }, []);

  const start = async () => {
    const isEmailValid = emailRef?.current?.validate(email);

    if (!isEmailValid) {
      return;
    }

    navigate(`${email.email}`);
  };

  return (
    <div className={s.root}>
      <Logo />
      <div className={s.content}>
      <div className={s.box}>
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
            ref={emailRef}
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

export default ConsumerPreviewMailOnly;
