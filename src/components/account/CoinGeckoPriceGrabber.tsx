import { CoinGeckoAPI } from "@coingecko/cg-api-ts";
import 'whatwg-fetch';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Portfolio } from '../../models/portfolio';
import { getPortfolioState } from '../../store/reducers/portfolio.reducer';
import { CoinGeckoService } from '../../services/coingecko.service';

export interface CoinGeckoPriceGrabberProps {}

const CoinGeckoPriceGrabber: React.FC<CoinGeckoPriceGrabberProps> = () => {
  const portfolioState: Portfolio | null = useSelector(getPortfolioState);
  const dispath = useDispatch();
  // const user = useSelector(getCurrentUser);
  useEffect(() => {
    const coins = portfolioState?.portfolioAssets?.map((portfolioAsset) => portfolioAsset.coin);
    console.log('coins!', coins);
    CoinGeckoService.getInstance().fetchUserCoins(coins || [], dispath);
  }, [portfolioState]);

  return (<></>);
}

export default CoinGeckoPriceGrabber;

