import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc, getDoc,
} from 'firebase/firestore/lite';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

import { useDatabase } from '../../Hooks';
import { ResearchPreview } from '../../components/App/Preview/ResearchPreview';

export function ConsumerResearchPreview() {
  const { activeResearch } = useParams();
  const { getDatabase } = useDatabase();
  const navigate = useNavigate();
  const [research, setResearch] = useState(null);

  useEffect(() => {
    async function fetchResearch() {
      const dataBase = getDatabase();
      const docRef = doc(dataBase, 'experiments', activeResearch);
      const docResearch = await getDoc(docRef);

      if (docResearch.exists() && docResearch.data()?.data?.['0']) {
        setResearch(docResearch.data()?.data?.['0']);
      } else {
        navigate(-1);
      }
    }

    fetchResearch();
  }, []);

  return (
    <div>
      {research ? <ResearchPreview research={research} /> : <div>NO RESEARCH FOUND</div>}
    </div>
  );
}

export default ConsumerResearchPreview;
