import H1 from './shared/ui/H1';
import { Box } from '@chakra-ui/react';
import { Link } from './shared/ChakraLinkFix';
import React from 'react';
import AuthenticatedRedirect from './shared/AuthenticatedRedirect';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <AuthenticatedRedirect />
      <H1>Home</H1>
      <Box mt="2">
        <Link to="/login">login</Link>
      </Box>
      <Box mt="2">
        <Link to="/signup">signup</Link>
      </Box>
    </>
   );
}

export default Home;