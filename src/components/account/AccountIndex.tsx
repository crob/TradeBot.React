import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';

import PortfolioHeader from './components/PortfolioHeader';
import PortfolioTable from './components/PortfolioTable';
import { getPortfolio } from '../../store/reducers/portfolio.reducer';
import { Portfolio } from '../../models/portfolio';

export interface AccountIndexProps {}

const AccountIndex: React.FC<AccountIndexProps> = () => {
  const portfolioState: Portfolio | null = useSelector(getPortfolio);
  // const user = useSelector(getCurrentUser);
  useEffect(() => {}, [portfolioState]);

  return (
    <>
      <Box>
        <PortfolioHeader />
        <PortfolioTable portfolioAssets={portfolioState?.portfolioAssets} />
      </Box>
    </>
   );
}

export default AccountIndex;