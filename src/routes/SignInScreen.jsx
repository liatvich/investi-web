// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyDPuVNfCGlfrgMbNX-jD-i1ndh3tFXFguA',
  authDomain: 'investitest-5253f.firebaseapp.com',
  // The value of `databaseURL` depends on the location of the database
  // databaseURL: "https://DATABASE_NAME.firebaseio.com", - real time :/
  projectId: 'investitest-5253f',
  storageBucket: 'investitest-5253f.appspot.com',
  // messagingSenderId: "SENDER_ID",
  appId: '1:644024387343:ios:8d646c4aed67cc13b1a07a',
};
firebase.initializeApp(firebaseConfig);

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

export function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
    // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
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
