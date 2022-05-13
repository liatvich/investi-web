import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore/lite';
// import parse from 'html-react-parser';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDatabase, useProvideAuth } from '../Hooks';
import { ResearchPreview } from '../components/App/Preview/ResearchPreview';

export function ActiveResearch() {
  const [researches, setResearches] = useState([]);
  const [displayedResearch, setDisplayedResearch] = useState(1);
  const { getDatabase } = useDatabase();
  const { user } = useProvideAuth();

  useEffect(() => {
    async function fetchResearch() {
      const dataBase = getDatabase();
      const q = query(collection(dataBase, 'experiments'), where('user_id', '==', user?.uid));
      //   const researchSnapshot = await getDocs(researchCol);
      //   const researchList = researchSnapshot.docs.map((doc) => doc.data());
      //   setResearches(researchList);

      const researchSnapshot = await getDocs(q);
      const researchList = researchSnapshot.docs.map((doc) => doc.data());
      console.log(researchList);
      setResearches(researchList);
    }

    fetchResearch();
  }, [user?.uid]);

  //   useEffect(() => {

  //   }, [displayedResearch]);

  const researchView = (research) => (
    research ? (
      <div key={research.title}>
        <Typography variant="h5" gutterBottom component="div">
          {research.title}
        </Typography>
        <Typography variant="h5" gutterBottom component="div">
          Experiment Preview:
        </Typography>
        {research?.data?.['0'] && <ResearchPreview research={research?.data?.['0']} />}
      </div>
    ) : <div>Empty</div>
  );

  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        Project List -
      </Typography>
      {researches.length > 0
        ? (
          <Stack spacing={2}>
            {researchView(researches[displayedResearch - 1])}
            <Pagination
              count={researches.length}
              defaultPage={0}
              page={displayedResearch}
              onChange={(event, value) => {
                setDisplayedResearch(value);
              }}
            />
          </Stack>
        ) : (
          <Typography variant="h5" gutterBottom component="div">
            Empty State
          </Typography>
        )}
    </div>
  );
}

export default ActiveResearch;
