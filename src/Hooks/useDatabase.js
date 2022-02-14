import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

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
