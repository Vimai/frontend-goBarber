import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SingIn from '../pages/SignIn';
import SingUn from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';

const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/signup" component={SingUn} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default routes;
