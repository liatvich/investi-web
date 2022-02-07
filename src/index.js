import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import { CreateExperiment, routes } from './routes';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes >
        <Route path="/" element={<App />}>
        {/* <Route
            index
            element={
            <main style={{ padding: "1rem" }}>
                <p>Select an invoice</p>
                </main>
                }
            />  THIS IS THE DEFAULT OUTLET*/} 
            <Route path={routes.CREATE_EXPERIMENT} element={<CreateExperiment />} />
        </Route>
        {/* <Route path={routes.CREATE_EXPERIMENT} element={<CreateExperiment />} /> */}
        <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
