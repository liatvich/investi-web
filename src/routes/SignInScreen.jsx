// Import FirebaseAuth and firebase.
import React, { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
// import { UserContext } from '../context';
import 'firebase/compat/auth';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useProvideAuth } from '../Hooks'; // useAuth

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
  // firebase.auth().currentUser ? (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  // ) : (
  //   <Navigate to="/" />
  // )
  );
//   }
//   return (
//     <div>
//       <h1>My App</h1>
//       <p>
//         Welcome
//         {' '}
//         {firebase.auth().currentUser.displayName}
//         ! You are now signed-in!
//       </p>
//       <button
//         type="submit"
//         onClick={() => firebase.auth().signOut()}
//       >
//         Sign-out
//       </button>
//     </div>
//   );
}

export default SignInScreen;
