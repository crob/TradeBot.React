import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PortfolioAsset } from '../../../models/portfolio';
import { fetchPortfolioAssets, getPortfolioAssetById, getPortfolioState, PortfolioState } from '../../../store/reducers/portfolio.reducer';
import { Link } from '../../shared/ChakraLinkFix';
import H1 from '../../shared/ui/H1';
import PortfolioTable from '../components/PortfolioTable';

export interface PortfolioAssetPageProps {}

const PortfolioAssetPage: React.FC<PortfolioAssetPageProps> = () => {
  const { id } = useParams() as any;
  const dispatch = useDispatch();

  const portfolioState: PortfolioState = useSelector(getPortfolioState);

  if (!portfolioState.loadingAssets && portfolioState.hasFetchedHoldings === false) {
    dispatch(fetchPortfolioAssets());
  }
  const asset: PortfolioAsset = useSelector(getPortfolioAssetById(parseInt(id, 10))) as PortfolioAsset;

  useEffect(() => {
    console.log("Here", asset)
  }, [portfolioState]);

  return (
    <>
      <Box margin="0 20px">
        <Link to='/account'>Back to Portfolio</Link>
        <H1>{asset?.coin} Holdings</H1>
        { (asset) ? <PortfolioTable portfolioAssets={[asset]} linkCoins={false} /> : '' }
      </Box>
    </>
   );
}

export default PortfolioAssetPage;
