import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { fetchPortfolio } from '../../store/reducers/portfolio.reducer';
import ProtectedRoute from '../shared/ProtectedRoute';
import PortfolioAssetPage from './asset/PortfolioAssetPage';
import AccountIndex from './AccountIndex';
import CoinGeckoPriceGrabber from './CoinGeckoPriceGrabber';
import { Box } from '@chakra-ui/react';
import SideBar from './components/SideBar';
import ExchangeIndex from './exchanges/ExchangeIndex';

const AccountRouter: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPortfolio());
  }, []);

  return (
    <>
      <Box display="flex">
        <SideBar />
        <Box  margin="0 20px">
          <Switch>
            <ProtectedRoute path="/account/asset/:coin" exact component={PortfolioAssetPage} />
            <ProtectedRoute path="/account/exchanges" exact component={ExchangeIndex} />

            <ProtectedRoute path="/account" exact component={AccountIndex} />
          </Switch>
        </Box>
      </Box>
      <CoinGeckoPriceGrabber />
    </>
  )
}

export default AccountRouter