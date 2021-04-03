import React, { useEffect } from 'react';
import H1 from '../shared/ui/H1';
import PortfolioHeader from './components/PortfolioHeader';
import PortfolioTable from './components/PortfolioTable';
import { Box } from '@chakra-ui/react';
import CoinGeckoPriceGrabber from './CoinGeckoPriceGrabber';

export interface AccountIndexProps {}

const AccountIndex: React.FC<AccountIndexProps> = () => {
  return (
    <>
      <Box margin="0 20px">
        <H1>Account</H1>
        <PortfolioHeader />
        <PortfolioTable />
      </Box>
      <CoinGeckoPriceGrabber />
    </>
   );
}

export default AccountIndex;