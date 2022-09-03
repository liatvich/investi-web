/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
  Typography, Button,
  Table, TableBody, TableCell,
  TableHead, TableRow, TableContainer, TablePagination, Chip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore/lite';
import s from './ActiveResearch.module.scss';
import { useDatabase, useProvideAuth } from '../../Hooks';
import { RESEARCH_STATUS } from '../../common/consts';

// eslint-disable-next-line react/prop-types
export function ActiveResearch({ createResearch, participantsSelected }) {
  const [researches, setResearches] = useState([]);
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

        '& .MuiTableCell-root:first-of-type': {
          borderBottomLeftRadius: '8px',
          borderTopLeftRadius: '8px',
        },

        '& .MuiTableCell-root:last-child': {
          borderBottomRightRadius: '8px',
          borderTopRightRadius: '8px',
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

      await Promise.all(
        researchList.map(async (research) => {
          const signups = await getDocs(collection(dataBase, `experiments/${research.id}/signups`));
          if (signups?.docs.length > 0) {
            // eslint-disable-next-line no-unused-vars
            const participantsData = signups?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            research.signups = signups?.docs?.length;
            research.actionsData = {
              signups: signups?.docs?.length,
              participantsData,
              researchTitle: research.title,
            };
          }
        }),
      );

      setResearches(researchList);
    }

    fetchResearch();
  }, [user?.uid]);

  const columns = [
    { id: 'Number', label: 'Number', minWidth: 17 },
    { id: 'id', label: 'ID', minWidth: 30 },
    { id: 'title', label: 'Research Name', minWidth: 50 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 70,
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (value) => {
        const status = value === RESEARCH_STATUS.PUBLISHED ? 'success' : 'warning';
        return <Chip label={value} color={status} />;
      },
    },
    {
      id: 'signups',
      label: 'Participants',
      minWidth: 70,
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (value) => `${value || 0} participants`,
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 50,
      // align: 'right',
      format: (value) => {
        if (!value) {
          return '';
        }
        const currDate = new Date(value);
        const date = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`;
        const time = `${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`;
        return `${date} ${time}`;
      },
    },
    {
      id: 'actionsData',
      minWidth: 50,
      align: 'right',
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (value) => (
        <div>
          <IconButton
            disableRipple
            disabled={!value || value?.signups === 0}
            onClick={() => {
              participantsSelected({
                participants: value?.participantsData,
                researchTitle: value?.researchTitle,
              });
            }}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton disableRipple>
            <CreateIcon />
          </IconButton>
          <IconButton disableRipple>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
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
                  {researches
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((research, index) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={research.id}
                      >
                        {columns.map((column) => {
                          const value = research[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'Number' ? (index + page * index)
                                : (column.format ? column.format(value) : (value || ''))}
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
              count={researches.length}
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
