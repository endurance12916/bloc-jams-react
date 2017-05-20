import React from 'react';
import { Router, Route } from 'react-router';
import App from './App';
import Home from './components/home';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} >
      <Route path="*" component={Home} />
    </Route>
  </Router>
);

export default Routes;