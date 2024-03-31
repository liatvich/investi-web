import React, {
  useState, useEffect, useContext, createContext,
} from 'react';
import firebase from 'firebase/compat/app';
// import * as firebase from 'firebase/app';
// import firebase from 'firebase';
// require('firebase/auth');
import 'firebase/compat/auth';

// export const UserContext = React.createContext();

// // eslint-disable-next-line react/prop-types
// export function UserContextProvider({ children }) {
//   const [loggedUser, setLoggedUser] = useState(null);

//   useEffect(() => {
//     const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
//       setLoggedUser(user);
//     });
//     return () => unregisterAuthObserver();
//     // Make sure we un-register Firebase observers when the component unmounts.
//   }, []);

//   const getLoggedUser = () => {
//     if (loggedUser == null && firebase.auth().currentUser) {
//       setLoggedUser(firebase.auth().currentUser);
//     }
//     return loggedUser;
//   };

//   return (
//     // eslint-disable-next-line react/jsx-no-constructed-context-values
//     <UserContext.Provider value={{
//       getLoggedUser, setLoggedUser, loggedUser,
//     }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// export const UserProviderConsumer = UserContext.Consumer;

// Add your Firebase credentials
// Configure Firebase.
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // The value of `databaseURL` depends on the location of the database
  // databaseURL: "https://DATABASE_NAME.firebaseio.com", - real time :/
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: "SENDER_ID",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

const authContext = createContext();

export function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      setUser(response.user);
      return response.user;
    });
  const signup = (email, password) => firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      setUser(response.user);
      return response.user;
    });
  const signout = () => firebase
    .auth()
    .signOut()
    .then(() => {
      setUser(false);
    });
  const sendPasswordResetEmail = (email) => firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => true);
  const confirmPasswordReset = (code, password) => firebase
    .auth()
    .confirmPasswordReset(code, password)
    .then(() => true);

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(false);
      }
    });
      // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    setUser,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
// eslint-disable-next-line react/prop-types
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);
// Provider hook that creates auth object and handles state
