/* eslint-disable no-param-reassign */
/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore/lite';
// import parse from 'html-react-parser';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDatabase, useProvideAuth } from '../../Hooks';
import { ResearchPreview } from '../../components/App/Preview/ResearchPreview';

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
      const researchList = researchSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(researchList);

      researchList.forEach(async (research) => {
        const signups = await getDocs(collection(dataBase, `experiments/${research.id}/signups`));
        if (signups.docs.length > 0) {
          research.signups = signups.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        }
      });

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
        {research?.data['1'] && <ResearchPreview research={research?.data} />}
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
            {researches[displayedResearch - 1].signups && (
              researches[displayedResearch - 1].signups.map((signup, index) => (
                <Typography>{`signup number: ${index} is ${signup.id}`}</Typography>
              )))}
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
