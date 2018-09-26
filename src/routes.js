import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Login, Signup, Home } from './components';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </Switch>
  );
};

export default withRouter(Routes);
