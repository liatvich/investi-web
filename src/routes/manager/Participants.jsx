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
  collection, query, where, getDocs,
} from 'firebase/firestore/lite';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import s from './Participants.module.scss';
import { PARTICIPANT_STATUS } from '../../common/consts';

// eslint-disable-next-line react/prop-types
export function Participants({
  participants, createResearch, researchTitle, back,
}) {
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

  // const [currParticipants, setCurrParticipants] = useState(participants);
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
        const date = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`;
        const time = `${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`;
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
          <IconButton
            disableRipple
            disabled={!value}
            onClick={() => {
              setResponses(Object.values(value)); handleOpen();
            }}
          >
            <VisibilityIcon sx={{ color: '#104C43' }} />
          </IconButton>
          <Typography variant="subtitle2" className={s.text}> View </Typography>
        </div>
      ),
    },
    {
      id: 'status',
      label: 'Participant Status',
      minWidth: 50,
      align: 'right',
      // eslint-disable-next-line react/no-unstable-nested-components
      format: (value) => (
        !value ? (
          <ThemeProvider theme={theme}>
            <div className={s.status}>
              <Button disableRipple variant="contained" color="neutral" className={s.button}>
                ACCEPT
              </Button>
              <Button disableRipple variant="outlined" color="neutralReverse">
                DECLINE
              </Button>
            </div>
          </ThemeProvider>
        ) : (
          value === PARTICIPANT_STATUS.APPROVED ? (
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
                {participants?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
            count={participants.length}
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
                (response) => response?.length > 0 && response[0].content && response[0].attrs,
              )
                ?.map((response) => (
                  <div className={s.response}>
                    <Typography variant="subtitle2" gutterBottom>
                      {response[0].content[0].text}
                      :
                    </Typography>
                    <Typography variant="body2" gutterBottom className={s.answer}>
                      {response[0].attrs.value}
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
