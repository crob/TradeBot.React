import { RepeatIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux';
import { SyncStatus } from '../../../enums/sync-status';
import { Portfolio, PortfolioAsset } from '../../../models/portfolio';
import { getPortfolio, syncPortfolio } from '../../../store/reducers/portfolio.reducer';
import AddExchangeButton from '../../shared/AddExchangeButton';
import H1 from '../../shared/ui/H1';

import './PortfolioHeader.scss';

export interface PortfolioHeaderProps {}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = () => {
  const portfolioState: Portfolio | null = useSelector(getPortfolio);
  const dispatch = useDispatch();
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
        <div className="portfolio-header">
          <dl>
            <dt>
              Total Investment
            </dt>
            <dd>
              <NumberFormat value={totalInvestment.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </dd>

            <Box as="dt" color={(totalUnrealizedGainz > 0) ? 'green.500' : 'red.500'}>
              Total Unrealized Gainz
            </Box>
            <Box as="dd" color={(totalUnrealizedGainz > 0) ? 'green.500' : 'red.500'}>
              <NumberFormat value={(totalUnrealizedGainz).toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
              <Box as="span"><NumberFormat value={((totalUnrealizedGainz / (totalInvestment - totalRealizedGainz)) * 100).toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Box>
            </Box>

            <Box as="dt" color={(totalRealizedGainz > 0) ? 'green.500' : 'red.500'}>
              Total Realized Gainz
            </Box>
            <Box as="dd" color={(totalRealizedGainz > 0) ? 'green.500' : 'red.500'}>
              <NumberFormat value={(totalRealizedGainz).toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </Box>
            <dt>
              Total Value
            </dt>
            <dd>
              <NumberFormat value={(totalValue).toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </dd>

            <dt>
              Last Sync
            </dt>
            <dd>
              {lastSyncDate}
            </dd>
          </dl>

          <AddExchangeButton isLoading={portfolioState?.syncStatus === SyncStatus.SYNCING} />

          <Button
            leftIcon={<RepeatIcon />}
            isLoading={portfolioState?.syncStatus === SyncStatus.SYNCING}
            loadingText="syncing"
            size="md"
            type="button"
            onClick={() => dispatch(syncPortfolio())}
          >
            Sync Portfolio
          </Button>
        </div>
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