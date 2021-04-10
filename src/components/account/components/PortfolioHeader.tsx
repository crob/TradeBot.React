import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { Portfolio, PortfolioAsset } from '../../../models/portfolio';
import { getPortfolioState, PortfolioState } from '../../../store/reducers/portfolio.reducer';
import H1 from '../../shared/ui/H1';

export interface PortfolioHeaderProps {}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = () => {
  const portfolioState: Portfolio | null = useSelector(getPortfolioState);
  // const user = useSelector(getCurrentUser);
  useEffect(() => {}, [portfolioState]);

  const getPortfolioHtml = () => {
    const totalInvestment = portfolioState?.portfolioAssets?.map(
      (portfolioAsset: PortfolioAsset) => portfolioAsset.totalInvested)
      .reduce((previousInvestment: number, currentInvestment: number) => previousInvestment += currentInvestment, 0) || 0;

    const totalValue = portfolioState?.portfolioAssets?.map(
        (portfolioAsset: PortfolioAsset) => portfolioAsset.totalValue)
        .reduce((previousInvestment: number, currentInvestment: number) => previousInvestment += currentInvestment, 0) || 0;
    const totalUnrealizedGainz = totalValue - totalInvestment;

    const totalRealizedShort = portfolioState?.portfolioAssets?.map(
      (portfolioAsset: PortfolioAsset) => portfolioAsset.realizedPnLShort)
      .reduce((p: number, c: number) => p += c, 0) || 0;
    const totalRealizedLong = portfolioState?.portfolioAssets?.map(
      (portfolioAsset: PortfolioAsset) => portfolioAsset.realizedPnLLong)
      .reduce((p: number, c: number) => p += c, 0) || 0;
    const totalRealizedGainz = totalRealizedLong + totalRealizedShort;

    let lastSyncDate = 'Not Synced';
    if (portfolioState?.lastSyncAt) {
      const lastSync = new Date(portfolioState?.lastSyncAt);
      lastSyncDate = `${lastSync.toLocaleDateString()} : ${lastSync.toLocaleTimeString()}`
    }
    return (
      <>
        <H1>Portfolio</H1>
        <div>Total Investment: <NumberFormat value={totalInvestment.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
        <Box color={(totalUnrealizedGainz > 0) ? 'green.500' : 'red.500'}>
          Total Unrealized Gainz: <NumberFormat value={(totalUnrealizedGainz).toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          <Box as="span" marginLeft="10px"><NumberFormat value={((totalUnrealizedGainz / (totalInvestment - totalRealizedGainz)) * 100).toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Box>
        </Box>
        <Box color={(totalRealizedGainz > 0) ? 'green.500' : 'red.500'}>
          Total Realized Gainz: <NumberFormat value={(totalRealizedGainz).toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
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