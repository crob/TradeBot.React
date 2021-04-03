import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Portfolio, PortfolioAsset } from '../../../models/portfolio';
import { getPortfolioState, PortfolioState } from '../../../store/reducers/portfolio.reducer';

export interface PortfolioHeaderProps {}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = () => {
  const portfolioState: Portfolio | null = useSelector(getPortfolioState);
  // const user = useSelector(getCurrentUser);
  useEffect(() => {}, [portfolioState]);

  const getPortfolioHtml = () => {
    const totalInvestment = portfolioState?.portfolioAssets?.map(
      (portfolioAsset: PortfolioAsset) => portfolioAsset.total)
      .reduce((previousInvestment: number, currentInvestment: number) => previousInvestment += currentInvestment, 0) || 0;

    const totalValue = portfolioState?.portfolioAssets?.map(
        (portfolioAsset: PortfolioAsset) => portfolioAsset.totalValue)
        .reduce((previousInvestment: number, currentInvestment: number) => previousInvestment += currentInvestment, 0) || 0;
    const totalGainz = totalValue - totalInvestment;
    let lastSyncDate = 'Not Synced';
    if (portfolioState?.lastSyncAt) {
      const lastSync = new Date(portfolioState?.lastSyncAt);
      lastSyncDate = `${lastSync.toLocaleDateString()} : ${lastSync.toLocaleTimeString()}`
    }
    return (
      <>
        <h2>Portfolio</h2>
        <div>Total Investment: <NumberFormat value={totalInvestment.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
        <Box color={(totalGainz > 0) ? 'green.500' : 'red.500'}>
          Total Gainz: <NumberFormat value={(totalGainz).toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          <Box as="span" marginLeft="10px"><NumberFormat value={((totalGainz / totalInvestment) * 100).toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Box>
        </Box>
        <div>
          Total Value: <NumberFormat value={(totalValue).toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </div>


        <div>Last Sync: {lastSyncDate}</div>
      </>
    )
  }

  return (
    <>
      {(portfolioState) ? getPortfolioHtml() : ''}
    </>
   );
}

export default PortfolioHeader;