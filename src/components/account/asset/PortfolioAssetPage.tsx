import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PortfolioAsset } from '../../../models/portfolio';
import { getPortfolioAssetByCoin } from '../../../store/reducers/portfolio.reducer';
import { Link } from '../../shared/ChakraLinkFix';
import H1 from '../../shared/ui/H1';
import PortfolioTable from '../components/PortfolioTable';

export interface PortfolioAssetPageProps {}

const PortfolioAssetPage: React.FC<PortfolioAssetPageProps> = () => {
  const { coin } = useParams() as any;
  // const dispatch = useDispatch();
  const asset: PortfolioAsset = useSelector(getPortfolioAssetByCoin(coin)) as PortfolioAsset;

  useEffect(() => {}, []);

  return (
    <>
      <Box margin="0 20px">
        <Link to='/account'>Back to Portfolio</Link>
        <H1>{coin} Holdings</H1>
        <PortfolioTable portfolioAssets={[asset]} linkCoins={false} />
      </Box>
    </>
   );
}

export default PortfolioAssetPage;