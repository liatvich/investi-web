import React, { useEffect, useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore/lite';
import parse from 'html-react-parser';
import { useDatabase } from '../Hooks';
import { UserContext } from '../context';

export function ActiveResearch() {
  const [researches, setResearches] = useState([]);
  const { getDatabase } = useDatabase();
  const { getLoggedUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchResearch() {
      const dataBase = getDatabase();
      const q = query(collection(dataBase, 'experiments'), where('user_id', '==', getLoggedUser().uid));
      //   const researchSnapshot = await getDocs(researchCol);
      //   const researchList = researchSnapshot.docs.map((doc) => doc.data());
      //   setResearches(researchList);

      const researchSnapshot = await getDocs(q);
      const researchList = researchSnapshot.docs.map((doc) => doc.data());
      setResearches(researchList);
    }

    fetchResearch();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        Main App Page
      </Typography>
      {researches.length > 0
        ? (
          researches.map((research) => (
            <div key={research.title}>
              <Typography variant="h5" gutterBottom component="div">
                {research.title}
              </Typography>
              <Typography variant="h5" gutterBottom component="div">
                Experiment Preview:
              </Typography>
              {parse(research.data)}
            </div>
          ))
        ) : (
          <Typography variant="h5" gutterBottom component="div">
            research not loaded
          </Typography>
        )}
    </div>
  );
}

export default ActiveResearch;