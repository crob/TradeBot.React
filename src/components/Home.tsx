import H1 from './shared/ui/H1';
import { Box } from '@chakra-ui/react';
import { Link } from './shared/chakra-link-fix';
export interface HomeProps {

}

const Home: React.FunctionComponent<HomeProps> = () => {
  return (
    <>
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