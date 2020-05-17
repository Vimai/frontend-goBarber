import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SingIn from '../pages/SignIn';
import SingUn from '../pages/SignUp';

const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/signup" exact component={SingUn} />
    </Switch>
  );
};

export default routes;
