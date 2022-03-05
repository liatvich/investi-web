import React from 'react';
import './App.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignInScreen, routes } from './routes';
import { ProvideAuth, useProvideAuth } from './Hooks';

export function App() {
  const font = "'Noto Sans', sans-serif";
  const theme = createTheme({
    typography: {
      fontFamily: font,
    },
  });
  //   const { loggedUser } = useContext(UserContext);
  const { user } = useProvideAuth();

  return (
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <div>
          {user ? (
            <>
              <Typography variant="h5" gutterBottom component="div">
                Main App Page
              </Typography>
              <Button variant="contained">  </Button>
              <Link to={`/${routes.CREATE_EXPERIMENT}`}>CreateExperiment</Link>
              <Link to="/active">active</Link>
              <Outlet />
            </>
          ) : (
            <SignInScreen />
          )}
          ;
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
