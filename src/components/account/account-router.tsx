import React from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../shared/ProtectedRoute';
import AccountIndex from './index';

const AccountRouter: React.FC<any> = (props: any) => {
  return (
    <Switch>
      <ProtectedRoute path="/account" exact component={AccountIndex} />
    </Switch>
  )
}

export default AccountRouter