import { Box } from '@chakra-ui/react';
import React from 'react';
import { Link } from '../../shared/ChakraLinkFix';

export interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {

  return (
    <>
      <Box padding="20px" borderRight="1px solid grey" listStyleType="none" as="ul">
        <li>
          <Link to='/account'>Portfolio</Link>
        </li>
        <li>
          <Link to='/account/exchanges'>Exchanges</Link>
        </li>
        <li>
          <Link to='/account'>Trade</Link>
        </li>
        <li>
          <Link to='/account'>History</Link>
        </li>
        <li>
          <Link to='/account'>Taxes</Link>
        </li>
      </Box>
    </>
  )
};

export default SideBar;