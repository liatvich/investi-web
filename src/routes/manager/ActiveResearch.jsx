/* eslint-disable no-param-reassign */
/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import {
  Typography, Button, Pagination, Stack,
  Table, TableBody, TableCell,
  TableHead, TableRow, TableContainer, TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore/lite';
import s from './ActiveResearch.module.scss';
import { ResearchPreview } from '../../components/App/Preview/ResearchPreview';
import { useDatabase, useProvideAuth } from '../../Hooks';

// eslint-disable-next-line react/prop-types
export function ActiveResearch({ createResearch }) {
  const [researches, setResearches] = useState([]);
  const [displayedResearch, setDisplayedResearch] = useState(1);
  const { getDatabase } = useDatabase();
  const { user } = useProvideAuth();
  const CssTableContainer = styled(TableContainer)({
    '& .MuiTable-root': {
      borderSpacing: '0px 12px !important',
      padding: '12px',
    },

    '& .MuiTableCell-root': {
      border: 0,
    },

    '& .MuiTableBody-root': {
      '& .MuiTableRow-root': {
        background: '#F5F7F9',

        '& .MuiTableCell-root:first-child': {
          'border-bottom-left-radius': '8px',
          'border-top-left-radius': '8px',
        },

        '& .MuiTableCell-root:last-child': {
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        },
      },
    },
  });

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

  { /* <Typography variant="h5" gutterBottom component="div">
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
        ) : ( */ }

  function createData(
    name,
    code,
    population,
    size,
  ) {
    const density = population / size;
    return {
      name, code, population, size, density,
    };
  }

  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={s.root}>
      <div className={s.innerContent}>
        <div className={s.titleSection}>
          <Typography variant="h5" gutterBottom component="div" className={s.title}>
            Your researches
          </Typography>
          <Button disableRipple className={s.create} onClick={createResearch}>
            + Create document
          </Button>
        </div>
        {researches.length === 0 ? (
          <div className={s.empty}>
            <Typography variant="h4" gutterBottom component="div" className={s.title}>
              You have no research yet
            </Typography>
            <Typography variant="h5" gutterBottom component="div" className={s.description}>
              Create a new research by opening a new document and
              <br />
              adding your guidelines instructions there
            </Typography>
            <Button disableRipple className={s.create} onClick={createResearch}>
              + Create document
            </Button>
          </div>
        ) : (
          <div className={s.table}>
            <CssTableContainer sx={{ borderRadius: '12px 12px 0px 0px' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        // sx={{
                        //   // '&:last-child td, &:last-child th': { border: 0 },
                        //   // borderColor: 0,
                        //   // tr: {
                        //   //   border: 0, backgroundColor:
                        //   // '#F5F7F9', borderRadius: '8px', margin: '21px',
                        //   // },

                        // }}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CssTableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveResearch;
