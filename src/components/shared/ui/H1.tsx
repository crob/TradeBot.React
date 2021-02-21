import { Heading, HeadingProps } from '@chakra-ui/react';
import React from "react";

export interface H1Props extends HeadingProps {
  focusOnPageLoad?: boolean;
}

const H1: React.FunctionComponent<H1Props> = (props: H1Props) => {
  // picking out 'as' property because we don't want it to be used
  const {
    focusOnPageLoad = true,
    as,
    fontSize = "2xl",
    mt = "6",
    ...rest
  } = props;

  const focus = (h1: HTMLHeadElement) => {
    if (h1) {
      if (typeof props.children === "string") {
        document.title = `${props.children} - TradeBot 3000`;
      } else {
        console.error(
          "H1 was set with a non string value, we use this to set the page title and it should be only a string",
          typeof props.children
        );
      }
      // single page apps shoud set the focus to the h1 on page change
      if (focusOnPageLoad) {
        setTimeout(() => {
          h1.focus();
        }, 750);
      }
    }
  };

  return (
    <Heading
      tabIndex={-1}
      fontSize={fontSize}
      mt={mt}
      as="h1"
      {...rest}
      ref={(h1) => {
        if (h1) {
          focus(h1);
        }
      }}
    >
      {props.children}
    </Heading>
  );
};

export default H1;
