import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useDatabase } from '../Hooks';

export function ActiveResearch() {
  const [researches, setResearches] = useState([]);
  const { getDatabase } = useDatabase();

  useEffect(() => {
    async function fetchResearch() {
      const dataBase = getDatabase();
      const researchCol = collection(dataBase, 'research');
      const researchSnapshot = await getDocs(researchCol);
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
            <div key={research.name}>
              <Typography variant="h5" gutterBottom component="div">
                {research.name}
              </Typography>
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
