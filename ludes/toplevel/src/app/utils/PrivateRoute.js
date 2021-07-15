import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthAPI } from '../views/Auth/api/AuthAPI';

const PrivateRoute = ({ children, ...rest }) => (
  <Route {...rest} render={({ location }) => (
    AuthAPI.isAuthenticated() ?
      children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
  )} />
)
export default PrivateRoute