// import logo from './logo.svg';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React from 'react';
import './App.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Outlet, Link } from 'react-router-dom';
import { routes, SignInScreen } from './routes';
import { UserContextProvider } from './context';

export function App() {
  return (
    <UserContextProvider>
      <div>
        <Typography variant="h5" gutterBottom component="div">
          Main App Page
        </Typography>
        <Button variant="contained">SOME BUTTON</Button>
        <SignInScreen />
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem',
          }}
        >
          <Link to={`/${routes.CREATE_EXPERIMENT}`}>CreateExperiment</Link>
          <Link to="/active">active</Link>
        </nav>
        <Outlet />
      </div>
    </UserContextProvider>
  );
}

export default App;
