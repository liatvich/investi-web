import React from 'react';
import './App.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { SignInScreen } from './routes/manager';
import { ProvideAuth, useProvideAuth } from './Hooks';
import { AppLayout } from './components/App/AppLayout';

export function App() {
  const font = "'Noto Sans', sans-serif";
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
              <div>
                <Typography variant="h5" gutterBottom component="div">
                  Choose User type:
                </Typography>
                <Button variant="contained" onClick={() => { navigate('/signin'); }}>Manager</Button>
                <Button variant="contained" onClick={() => { navigate('/research'); }}>Consumer</Button>
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
