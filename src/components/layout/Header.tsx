import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Box, Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, getUserState, logout, UserState } from '../../store/reducers/user.reducer';
import { ButtonLink, NavLink } from '../shared/ChakraLinkFix';

function Header() {

  const userState: UserState = useSelector(getUserState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  function onLogout() {
    dispatch(logout());
  }

  return (
    <Flex
      align="left"
      as="header"
      p={3}
      alignItems="center"
      borderBottom="1px"
      borderBottomColor="gray.400"
    >
      <Box flexGrow={1}>
        <NavLink color="white" to="/">TradeBot 3000</NavLink>
      </Box>

      {!userState.loading && !userState.current && (
        <Box as="nav" aria-label="Main nav">
          <ul className="noStyle">
            <li>
              <ButtonLink to="/login" border="1px" size="sm">
                Login
              </ButtonLink>
            </li>
            <li>
              <ButtonLink
                to="/signup"
                border="1px"
                borderColor="blue.700"
                size="sm"
              >
                Sign up
              </ButtonLink>
            </li>
          </ul>
        </Box>
      )}
      {userState.current && (
        <Menu>
          <MenuButton as={Button} size="sm" rightIcon={<ChevronDownIcon />}>
            {userState.current?.email}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}

export default Header;