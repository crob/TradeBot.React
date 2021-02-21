import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select as ChakraSelect,
  FormControlProps,
} from "@chakra-ui/react";

export interface MySelectProps extends FormControlProps {
  id: string;
  label?: string;
  labelComponent?: React.Component | JSX.Element;
  defaultValue?: any;
  inputRef: any;
  errors: any;
  enums: any[];
}

const Select: React.FunctionComponent<MySelectProps> = (props: MySelectProps) => {
  const {
    id,
    inputRef,
    label,
    errors,
    mt = "3",
    defaultValue,
    enums = [],
    ...rest
  } = props;

  const [enumValue, enumText] = enums;
  const options = Object.keys(enumValue).map((key) => (
    <option key={key} value={enumValue[key]}>
      {enumText[enumValue[key]]}
    </option>
  ));

  return (
    <FormControl mt={mt} isInvalid={!!errors[id]} {...rest}>
      <FormLabel color={(!!errors[id]) ? 'red.500' : 'inherit'} htmlFor={id}>{label}</FormLabel>
      <ChakraSelect
        ref={inputRef}
        defaultValue={defaultValue || ""}
        id={id}
        name={id}
        aria-describedby={errors[id] ? `${id}_errors` : undefined}
      >
        <option value="">Choose</option>
        {options.map((option) => option)}
      </ChakraSelect>
      <FormErrorMessage id={`${id}_errors`}>{props.children}</FormErrorMessage>
    </FormControl>
  );
};

export default Select;
