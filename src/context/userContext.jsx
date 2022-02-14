import React, { useState, useEffect } from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
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

export const UserContext = React.createContext();

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);

  //   useEffect(() => {
  //     setLoggedUser(firebase.auth().currentUser);
  //   }, []);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      setLoggedUser(user);
    });
    return () => unregisterAuthObserver();
    // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const getLoggedUser = () => {
    if (loggedUser == null && firebase.auth().currentUser) {
      setLoggedUser(firebase.auth().currentUser);
    }
    return loggedUser;
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{
      getLoggedUser, setLoggedUser,
    }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const UserProviderConsumer = UserContext.Consumer;
