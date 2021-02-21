import React from "react";

import { Flex } from "@chakra-ui/react";
import H1 from '../shared/ui/H1';
import SignupForm from './forms/SignupForm';
// import { useDispatch, useSelector } from "react-redux";
// import { login, getUserState } from "../../store/user";
// import AuthenticatedRedirect from "../shared/AuthenticatedRedirect";

function SignupPage(props: any) {
  return (
    <Flex m="0 auto" height="100%" flexDirection="column" transform="translateY(15%)"  maxWidth="400px">
      {/* <AuthenticatedRedirect /> */}
      <H1>Signup</H1>
      <SignupForm />
    </Flex>
  );
}

export default SignupPage;
