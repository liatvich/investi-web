import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import s from './App.module.scss';
// import { SignInScreen } from './routes/manager';
import { ProvideAuth, useProvideAuth } from './Hooks';
import { AppLayout } from './components/App/AppLayout';
import { Logo } from './assets/logo';
import welcome from './assets/welcome.png';

export function App() {
  const font = "'Helvetica', sans-serif";
  const theme = createTheme({
    typography: {
      fontFamily: font,
    },
  });
  //   const { loggedUser } = useContext(UserContext);
  const { user } = useProvideAuth();
  const navigate = useNavigate();

  return (
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <div>
          {user ? (
            <>
              {/* <Typography variant="h5" gutterBottom component="div">
                Main App Page
              </Typography>
              <Button variant="contained">  </Button>
              <Link to={`/${routes.CREATE_EXPERIMENT}`}>CreateExperiment</Link>
              <Link to="/active">active</Link> */}
              <AppLayout>
                {/* <Link to={`/${routes.CREATE_EXPERIMENT}`}>CreateExperiment</Link>
                <Link to="/active">active</Link> */}
                <Outlet />
              </AppLayout>
            </>
          )
            : (
              <div className={s.root}>
                <div className={s.header}>
                  <div className={s.logo}>
                    <Logo className={s.icon} color="#B6E4E4" />
                    <Typography variant="subtitle1" component="div" className={s.text}>
                      INVESTI PET
                    </Typography>
                  </div>
                  <div className={s.right}>
                    <Button variant="text" className={s.button}>contact</Button>
                    <Button variant="text" className={s.button}>about</Button>
                  </div>
                </div>
                <div className={s.actions}>
                  <div className={s.center}>
                    <Typography variant="h2" gutterBottom component="div" className={s.title}>
                      Welcome to Investi Pet!
                    </Typography>
                    <Typography variant="h5" gutterBottom component="div" className={s.description}>
                      The place where pet investigations are easier to create and track
                      (also to participate).
                    </Typography>
                    <Typography variant="h5" gutterBottom component="div" className={s.description}>
                      Choose what you are here for
                    </Typography>

                    <div className={s.buttons}>
                      <Button
                        variant="contained"
                        onClick={() => { navigate('/signin'); }}
                        startIcon={<TextSnippetOutlinedIcon className={s.note} />}
                        className={s.manager}
                      >
                        Research Manager
                      </Button>
                      <Button variant="contained" onClick={() => { navigate('/research'); }} startIcon={<Logo color="#104C43" />} className={s.consumer}>
                        Research Participant
                      </Button>
                    </div>
                  </div>
                  <div className={s.space} />
                  <img src={welcome} alt="welcome" className={s.image} />
                </div>
              </div>

          // <SignInScreen />
            )}
          {/* <nav
            style={{
              borderBottom: 'solid 1px',
              paddingBottom: '1rem',
            }}
          >
            <Link to={`/${routes.CREATE_EXPERIMENT}`}>CreateExperiment</Link>
            <Link to="/active">active</Link>
          </nav>
          <Outlet /> */}
        </div>
      </ThemeProvider>
    </ProvideAuth>
  );
}

export default App;
