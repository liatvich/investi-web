/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
  Typography, Button,
  Table, TableBody, TableCell,
  TableHead, TableRow, TableContainer, TablePagination, Chip,
  IconButton, Snackbar, Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import {
  collection, query, where, getDocs, deleteDoc, doc,
} from 'firebase/firestore/lite';
import { RESEARCH_STATUS } from '../../common/consts';
import { useDatabase, useProvideAuth } from '../../Hooks';
import s from './ActiveResearch.module.scss';

export function ActiveResearch({
  // eslint-disable-next-line react/prop-types
  createResearch, participantsSelected, onEditExperiment, onSetResearch,
}) {
  const [researches, setResearches] = useState([]);
  const [isShareOpen, setIsShareOpen] = useState(false);

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
      const researchList = researchSnapshot.docs.map(
        (currDoc) => ({ ...currDoc.data(), id: currDoc.id }
        ),
      );

      await Promise.all(
        researchList.map(async (research) => {
          const signups = await getDocs(collection(dataBase, `experiments/${research.id}/signups`));
          research.actionsData = {
            title: research.title,
            id: research.id,
            status: research.status,
            title: research.title,
            researchJson: research?.data || [],
            researchType: research?.researchType,
            submitText: research?.submitText,
          };
          if (signups?.docs.length > 0) {
            // eslint-disable-next-line no-unused-vars
            const participantsData = signups
              ?.docs
              ?.map((signedUser) => ({
                ...signedUser.data(),
                id: signedUser.id,
                researchId: research.id,
              }));
            research.signups = signups?.docs?.length;
            research.actionsData = {
              ...research.actionsData,
              signups: signups?.docs?.length,
              participantsData,
            };
          }
        }),
      );

      researchList.sort(
        (firstResearch, secondResearch) => (
          new Date(secondResearch.date) - new Date(firstResearch.date)
        ),
      );

      setResearches(researchList);
    }

    if(user?.uid) {
      fetchResearch();
    }
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
        const status = value === RESEARCH_STATUS.PUBLISHED ? 'success'
          : value === RESEARCH_STATUS.DRAFT ? 'warning' : 'info';
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
        const date = `${currDate.getMonth() + 1}/${currDate.getDate()}/${currDate.getFullYear()}`;
        const time = `${currDate.getMinutes()}:${currDate.getHours()}`;
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
            disabled={!value || !value?.signups || value?.signups === 0}
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(`petsdatalab.com/research/${value?.id}`);
              setIsShareOpen(true);
            }}
          >
            <ShareIcon />
          </IconButton>
          <Snackbar
            open={isShareOpen}
            autoHideDuration={6000}
            onClose={() => setIsShareOpen(false)}
          >
            <Alert onClose={() => setIsShareOpen(false)} severity="success" sx={{ width: '100%' }}>
              Direct link to research copied to clipboard
            </Alert>
          </Snackbar>
          <IconButton
            disableRipple
            disabled={!value || !value?.signups || value?.signups === 0}
            onClick={(e) => {
              e.stopPropagation();
              participantsSelected({
                participants: value?.participantsData,
                title: value?.title,
                researchType: value?.researchType,
              });
            }}
          >
            <GroupsIcon />
          </IconButton>
          <IconButton
            disableRipple
            onClick={(e) => {
              e.stopPropagation();
              onEditExperiment({
                title: value?.title,
                researchJson: value?.researchJson,
                updateResearchId: value?.id,
                submitText: value?.submitText,
              });
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            disableRipple
            onClick={async (e) => {
              e.stopPropagation();
              // Add here if you are sure you want to delete popup
              const dataBase = getDatabase();
              const researchRef = doc(dataBase, `experiments/${value?.id}`);
              await deleteDoc(researchRef);

              const researchesList = researches.filter((research) => research.id !== value?.id);
              setResearches(researchesList);
            }}
          >
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
            + Create Research
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
              + Create Research
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
                        onClick={() => {
                          if (research.status === RESEARCH_STATUS.PUBLISHED
                             || research.status === RESEARCH_STATUS.STARTED) {
                            onSetResearch(research);
                          }
                        }}
                      >
                        {columns.map((column) => {
                          const value = research[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} className={s.cell}>
                              {column.id === 'Number' ? (index + page * index + 1)
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
