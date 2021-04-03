
import {
  NavLink as RouterNavLink,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  NavLinkProps as RouterNavLinkProps,
} from "react-router-dom";
import {
  Link as ChakraLink,
  Button as ChakraButton,
  BreadcrumbLink as ChakraBreadcrumbLink,
  LinkProps as ChakraLinkProps,
  ButtonProps as ChakraButtonProps,
  BreadcrumbItemProps as ChakraBreadcrumbProps,
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from "@chakra-ui/react";
import React, { HTMLProps } from "react";

type AllLinkProps = RouterLinkProps & ChakraLinkProps;

type AllNavLinkProps = RouterNavLinkProps &
  ChakraLinkProps;

type AllButtonLinkProps = RouterLinkProps & ChakraButtonProps;
type AllIconButtonLinkProps = RouterLinkProps & ChakraIconButtonProps;

type AllChakraBreadcrumbProps = RouterLinkProps & ChakraBreadcrumbProps;
type AllChakraMenuItemProps = RouterLinkProps &
  ChakraMenuItemProps;


export const Link = React.forwardRef(
  (props: AllLinkProps, ref: React.Ref<any>) => {
    return (
      <ChakraLink
        {...props}
        // @ts-ignore
        as={RouterLink}
      />
    );
  }
);

export const BreadcrumbLink = React.forwardRef(
  (props: AllChakraBreadcrumbProps, ref: React.Ref<any>) => {
    return (
      <ChakraBreadcrumbLink
        ref={ref}
        {...props}
        // @ts-ignore
        as={RouterLink}
      />
    );
  }
);

export const MenuItemLink = React.forwardRef(
  (props: AllChakraMenuItemProps, ref: React.Ref<any>) => {
    return (
      <ChakraMenuItem
        ref={ref}
        {...props}
        // @ts-ignore
        as={RouterLink}
      />
    );
  }
);

export const NavLink = React.forwardRef(
  (props: AllNavLinkProps, ref: React.Ref<any>) => {
    return (
      <ChakraLink
        ref={ref}
        {...props}
        // @ts-ignore
        as={RouterNavLink}
      />
    );
  }
);

export const ButtonLink = React.forwardRef(
  (props: AllButtonLinkProps, ref: React.Ref<any>) => {
    return (
      <ChakraButton
        ref={ref}
        {...props}
        // @ts-ignore
        as={RouterLink}
      />
    );
  }
);

export const IconButtonLink = React.forwardRef(
  (props: AllIconButtonLinkProps, ref: React.Ref<any>) => {
    return (
      <ChakraIconButton
        ref={ref}
        {...props}
        // @ts-ignore
        as={RouterLink}
      />
    );
  }
);
