import React from "react";

import { Flex } from "@chakra-ui/react";
import H1 from '../shared/ui/H1';
import LoginForm from './forms/LoginForm';

function LoginPage(props: any) {
  return (
    <Flex m="0 auto" height="100%" flexDirection="column" transform="translateY(15%)"  maxWidth="400px">
      {/* <AuthenticatedRedirect /> */}
      <H1>Login</H1>
      <LoginForm />
    </Flex>
  );
}

export default LoginPage;
