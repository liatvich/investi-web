// Import FirebaseAuth and firebase.
import React, { useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { UserContext } from '../context';
import 'firebase/compat/auth';

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
    signInSuccessWithAuthResult: () => false,
  },
};

export function SignInScreen() { // SHOULD BE COMPONENT!
  const { getLoggedUser } = useContext(UserContext);

  if (!getLoggedUser()) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>
        Welcome
        {' '}
        {firebase.auth().currentUser.displayName}
        ! You are now signed-in!
      </p>
      <button
        type="submit"
        onClick={() => firebase.auth().signOut()}
      >
        Sign-out
      </button>
    </div>
  );
}

export default SignInScreen;
