import React from "react";

import { Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import FormServerError from '../../shared/ui/forms/FormServerError';
import TextInput from '../../shared/ui/forms/TextInput';
import { Link } from '../../shared/ChakraLinkFix';
// import { useDispatch, useSelector } from "react-redux";
// import { login, getUserState } from "../../store/user";
// import AuthenticatedRedirect from "../shared/AuthenticatedRedirect";

function SignupForm(props: any) {
  const { handleSubmit, errors, register } = useForm();
  // const dispatch = useDispatch();
  // const userState = useSelector(getUserState);

  function onSubmit(values: any) {
    console.log("submit", values)
    // dispatch(login(values));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="email"
        label="Email"
        errors={errors}
        inputRef={register({ required: true })}
      >
        {errors.email &&
          errors.email.type === "required" &&
          "Email is required"}
      </TextInput>
      <TextInput
        inputType="password"
        id="password"
        label="Password"
        errors={errors}
        inputRef={register({ required: true })}
      >
        {errors.password &&
          errors.password.type === "required" &&
          "Password is required"}
      </TextInput>

      <Button
        mt={4}
        width="100%"
        marginTop="6"
        // isLoading={userState.loading}
        loadingText="registering"
        type="submit"
        aria-describedby="registerError"
      >
        Submit
      </Button>

      <FormServerError id="registerError">
        {/* {userState?.error && "Incorrect Email or Password. Please try again."} */}
      </FormServerError>
      <Box mt="2">
        <Link to="/login">Already have an account? login</Link>
      </Box>
    </form>
  );
}

export default SignupForm;
