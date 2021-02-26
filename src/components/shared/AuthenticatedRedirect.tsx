import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from '../../store/reducers/user.reducer';

interface AuthenticatedRedirectProps {}

const AuthenticatedRedirect: React.FC<AuthenticatedRedirectProps> = props => {
  const user = useSelector(getCurrentUser);
  return <>{user && <Redirect to="/account" />}</>;
};

export default AuthenticatedRedirect;
