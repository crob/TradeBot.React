import React from "react";

import { Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import FormServerError from '../../shared/ui/forms/FormServerError';
import TextInput from '../../shared/ui/forms/TextInput';
import { Link } from '../../shared/ChakraLinkFix';
import { useDispatch, useSelector } from 'react-redux';
import { getUserState, login } from '../../../store/reducers/user.reducer';

function LoginForm(props: any) {
  const { handleSubmit, errors, register } = useForm();

  const dispatch = useDispatch();
  const userState = useSelector(getUserState);

  function onSubmit(values: any) {
    dispatch(login(values));
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
          "Password is required sd sd"}
      </TextInput>

      <Button
        mt={4}
        width="100%"
        marginTop="6"
        isLoading={userState.loading}
        loadingText="authenticating"
        type="submit"
        aria-describedby="loginError"
      >
        Submit
      </Button>

      <FormServerError id="loginError">
        {userState?.error && "Incorrect Email or Password. Please try again."}
      </FormServerError>
      <Box mt="6">
        <Link to="/forgot-password">Having trouble? reset your password</Link>
      </Box>
      <Box mt="2">
        <Link to="/signup">Don't have an account? Sign up for one now</Link>
      </Box>
    </form>
  );
}

export default LoginForm;
