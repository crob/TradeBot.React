import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

interface TextInputProps extends FormControlProps {
  id: string;
  label?: string;
  labelComponent?: React.Component | JSX.Element;
  inputRef: any;
  inputType?: string;
  errors: any;
}

function TextInput(props: TextInputProps) {
  const {
    id,
    label,
    inputRef,
    inputType = "text",
    mt = "3",
    defaultValue,
    errors,
    ...rest
  } = props;

  return (
    <FormControl mt={mt} isInvalid={!!errors[id]} {...rest}>
      <FormLabel color={(!!errors[id]) ? 'red.500' : 'inherit'} htmlFor={id}>{label}</FormLabel>
      <Input
        id={id}
        name={id}
        type={inputType}
        ref={inputRef}
        defaultValue={defaultValue}
        aria-describedby={props.isInvalid ? `${id}_errors` : undefined}
      />
      <FormErrorMessage fontSize="lg" id={`${id}_errors`}>{props.children}</FormErrorMessage>
    </FormControl>
  );
}

export default TextInput;
