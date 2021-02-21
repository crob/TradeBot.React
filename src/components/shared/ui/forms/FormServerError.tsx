import { BoxProps, Box, Icon } from "@chakra-ui/react";
import React from "react";

interface FormServerErrorProps extends BoxProps {
  size?: string;
}

function FormServerError(props: FormServerErrorProps) {
  let { color, mt, fontSize, size, ...rest } = props;
  color = color || "red.500";
  mt = props.mt || "3";
  fontSize = props.fontSize || "sm";
  size = size || "4";

  let errorMessage = (
    <>
      <Icon name="warning" size={size + ""} mt="-2px" mr="1" color={color} />
      {props.children}
    </>
  );

  return (
    <Box color={color} mt={mt} fontSize={fontSize} {...rest}>
      {props.children ? errorMessage : null}
    </Box>
  );
}

export default FormServerError;
