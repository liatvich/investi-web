import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from './App';
import { ConsumerPreview } from './routes/consumer/ConsumerPreview/ConsumerPreview';
import { ConsumerResearchPreview } from './routes/consumer/ConsumerResearchPreview';

import {
  CreateExperiment, routes, ActiveResearch,
  SignInScreen,
} from './routes/manager';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path={routes.CREATE_EXPERIMENT} element={<CreateExperiment />} />
          <Route path="active" element={<ActiveResearch />} />
        </Route>
        <Route path={routes.SIGN_IN} element={<SignInScreen />} />
        <Route path="research" element={<ConsumerPreview />} />
        <Route path="research/:activeResearch/:email" element={<ConsumerResearchPreview />} />
        <Route
          path="*"
          element={(
            <App />
      )}
        />
      </Routes>

      {/* <Route path="/" element={<SignInScreen />} /> */}
      {/* <Route path="/" element={<App />}> */}
      {/* //    <Route
        //     index
        //     element={
        //     <main style={{ padding: "1rem" }}>
        //         <p>Select an invoice</p>
        //         </main>
        //         }
        //     />  THIS IS THE DEFAULT OUTLET */}
      {/* <Route path={routes.CREATE_EXPERIMENT} element={<CreateExperiment />} />
          <Route path={routes.SIGN_IN} element={<SignInScreen />} />
          <Route path="active" element={<ActiveResearch />} />
        </Route>
        <Route path={routes.CREATE_EXPERIMENT} element={<CreateExperiment />} />
        <Route
          path="*"
          element={(
            <main style={{ padding: '1rem' }}>
              <p>Theres nothing here!</p>
            </main>
      )}
        /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
