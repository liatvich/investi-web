/* eslint-disable global-require */
import React, { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import Typography from '@mui/material/Typography';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import { useProvideAuth } from '../../Hooks'; // useAuth
import s from './SignInScreen.module.scss';

export function SignInScreen() {
//   const { getLoggedUser } = useContext(UserContext);

  //   if (!getLoggedUser()) {
  const { setUser } = useProvideAuth();
  const navigate = useNavigate();
  //   const auth = useAuth();

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
  //   signInFlow: 'popup',
    signInFlow: 'redirect',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (user) => setUser(user),
    },
  };

  useEffect(() => {
    if (firebase?.auth()?.currentUser) {
      navigate('/');
    }
    // const unregisterAuthObserver = firebase.auth().get((user) => {
    //   setLoggedUser(user);
    // });
    // unregisterAuthObserver();
    // Make sure we un-register Firebase observers when the component unmounts.
  }, [firebase?.auth()?.currentUser]);

  return (
    <div className={s.signin}>
      <div className={s.top}>
        <Typography variant="h5" gutterBottom component="div" className={s.username}>
          Log in to start the investigation adventure
        </Typography>
        <img className={s.image} src={require('../../Resources/searchImage.png')} alt="Logo" />
      </div>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen;
