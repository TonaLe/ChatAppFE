import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import {routersAuth, routersNotAuth} from './config/routers';

let auth_token = localStorage.getItem('token')
if (auth_token) {
  window.axios = require('axios');
  window.axios.defaults.headers.common['Authorization'] = `Bearer ${auth_token}`;
}

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem('token') ? (
          children
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routersNotAuth?.map((route, idx) => {
            const Component = lazy(() => import(`./pages/${route?.component}`));
            return (
              <Route exact={true} path={route.path} key={`notAuth-${idx}`}>
                <Component />
              </Route>
            );
          })}
          {routersAuth?.map((route, idx) => {
            const Component = lazy(() => import(`./pages/${route?.component}`));
            return (
              <PrivateRoute exact={true} path={route.path} key={`auth-${idx}`}>
                <Component />
              </PrivateRoute>
            );
          })}
          <Route path='/'>
            <Redirect to="/login" />
          </Route>
          <Route path='*'>
            <h3 data-test='404'>Page not found</h3>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
