import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

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

// eslint-disable-next-line import/prefer-default-export
export function useDatabase() {
  const [dataBase, setDatabase] = useState(null);
  //   useEffect(() => {
  //     const app = initializeApp(firebaseConfig);
  //     dataBase = getFirestore(app);
  //   }, []);

  const getDatabase = () => {
    let db = dataBase;
    if (!db) {
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      setDatabase(db);
    }
    return db;
  };

  return { getDatabase };
}

// export default useDatabase;
