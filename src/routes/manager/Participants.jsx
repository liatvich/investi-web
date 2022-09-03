/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import {
  Typography, Button,
  Table, TableBody, TableCell,
  TableHead, TableRow, TableContainer, TablePagination,
  IconButton, Modal, Box,
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  doc, getDoc, updateDoc,
} from 'firebase/firestore/lite';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useDatabase, useProvideAuth } from '../../Hooks';
import s from './Participants.module.scss';
import { PARTICIPANT_STATUS } from '../../common/consts';

// eslint-disable-next-line react/prop-types
export function Participants({
  participants, createResearch, researchTitle, back,
}) {
  const { getDatabase } = useDatabase();
  const dataBase = getDatabase();
  const [currParticipants, setCurrParticipants] = useState(participants);

  const updateStatus = async (participant, status) => {
    const participantRef = doc(dataBase, `experiments/${participant.researchId}/signups/${participant.email}`);
    await updateDoc(participantRef, {
      status,
    });
    participant.status = status;
    setCurrParticipants([...currParticipants]);
  };

  const theme = createTheme({
    // status: {
    //   danger: '#e53e3e',
    // },
    palette: {
      neutralReverse: {
        main: '#104C43',
      },
      neutral: {
        main: '#104C43',
        contrastText: '#fff',
      },
    },
  });

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.06)',
    p: 4,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [responses, setResponses] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const spreadDocData = (docData) => docData && Object.values(docData)?.reduce(
    (spreadData, currData) => [...spreadData, ...currData],
    [],
  );

  const columns = [
    { id: 'Number', label: 'Number', minWidth: 17 },
    {
      id: 'date',
      label: 'Date',
      minWidth: 50,
      format: (value) => {
        if (!value) {
          return '';
        }
        const currDate = new Date(value);
        if (Number.isNaN(currDate.getMonth())) {
          return '';
        }
        const date = `${currDate.getMonth() + 1}/${currDate.getDate()}/${currDate.getFullYear()}`;
        const time = `${currDate.getMinutes()}:${currDate.getHours()}`;
        return `${date} ${time}`;
      },
    },
    { id: 'email', label: 'Email', minWidth: 50 },
    {
      id: 'inputs',
      label: 'Responses',
      minWidth: 50,
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (value) => (
        <div className={s.display}>
          <Button
            disableRipple
            disabled={!value && value?.[0]}
            className={s.text}
            onClick={() => {
              setResponses(spreadDocData(Object.values(value)));
              handleOpen();
            }}
            startIcon={<VisibilityIcon sx={{ color: '#104C43' }} />}
          >
            View
          </Button>
        </div>
      ),
    },
    {
      id: 'status',
      label: 'Participant Status',
      minWidth: 50,
      align: 'right',
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (participant) => (
        !participant?.status ? (
          <ThemeProvider theme={theme}>
            <div className={s.status}>
              <Button
                disableRipple
                variant="contained"
                color="neutral"
                className={s.button}
                onClick={() => {
                  updateStatus(
                    participant,
                    PARTICIPANT_STATUS.APPROVED,
                  );
                }}
              >
                ACCEPT
              </Button>
              <Button
                disableRipple
                variant="outlined"
                color="neutralReverse"
                onClick={() => {
                  updateStatus(
                    participant,
                    PARTICIPANT_STATUS.DENIED,
                  );
                }}
              >
                DECLINE
              </Button>
            </div>
          </ThemeProvider>
        ) : (
          participant?.status === PARTICIPANT_STATUS.APPROVED ? (
            <Typography variant="subtitle2"> APPROVED </Typography>
          ) : (<Typography variant="subtitle2"> DENIED </Typography>)
        )
      ),
    },
  ];

  return (
    <div className={s.root}>
      <div className={s.innerContent}>
        <div className={s.titleSection}>
          <div className={s.back}>
            <IconButton disableRipple onClick={back}>
              <KeyboardBackspaceIcon sx={{ color: '#104C43' }} />
            </IconButton>
            <Typography variant="h5" component="div" className={s.title}>
              {researchTitle}
            </Typography>
          </div>

          <Button disableRipple className={s.create} onClick={createResearch}>
            + Create document
          </Button>
        </div>
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
                {currParticipants?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((participant, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={participant.id}
                    >
                      {columns.map((column) => {
                        const value = participant[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'Number' ? (index + page * index + 1)
                              : (column.format
                                ? column.id === 'status' ? column.format(participant)
                                  : column.format(value) : (value || ''))}
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
            count={participants?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="participant"
          aria-describedby="participant"
        >
          <Box sx={boxStyle}>
            {
            !responses ? <div> No responses </div> : (
              responses?.filter(
                (response) => response?.content && response?.attrs,
              )
                ?.map((response) => (
                  <div className={s.response}>
                    <Typography variant="subtitle2" gutterBottom>
                      {response?.content?.[0]?.text || ''}
                      :
                    </Typography>
                    <Typography variant="body2" gutterBottom className={s.answer}>
                      {response?.attrs?.value || ''}
                    </Typography>
                  </div>
                )))
          }
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Participants;
