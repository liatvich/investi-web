// import { Route, Redirect } from 'react-router-dom';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// export default PrivateRoute;
import React from 'react';
import {
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../../Hooks';

// eslint-disable-next-line react/prop-types
export function ({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) => (auth.user ? (
        children
      ) : (
        <Navigate
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

export default PrivateRoute;
