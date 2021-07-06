import { Box } from '@chakra-ui/react';
import { Td } from '@chakra-ui/table';
import React, { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { PortfolioAsset } from '../../../models/portfolio';
import { Link } from '../../shared/ChakraLinkFix';

export interface PortfolioTableRowProps {
  portfolioAsset: PortfolioAsset;
  linkCoins?: boolean;
}

const PortfolioTableRow: React.FC<PortfolioTableRowProps> = (props: PortfolioTableRowProps) => {
  const { portfolioAsset, linkCoins } = props;

  const getContent = () => {
    return (
      <>
        <Td>{(linkCoins) ? <Link to={`/account/asset/${portfolioAsset.id}`}>{portfolioAsset.coin}</Link> : portfolioAsset.coin}</Td>
        <Td isNumeric>{portfolioAsset.amount.toFixed(3)}</Td>
        <Td isNumeric><NumberFormat value={portfolioAsset.percentageOfPortfolio?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Td>
        <Td isNumeric><NumberFormat value={portfolioAsset.currentPrice?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Td>
        <Td isNumeric><NumberFormat value={portfolioAsset.averagePrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Td>
        <Td isNumeric><NumberFormat value={portfolioAsset.totalValue?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Td>
        <Td isNumeric><NumberFormat value={portfolioAsset.totalInvested.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Td>
        <Td isNumeric color={(portfolioAsset.unrealizedValue > 0) ? 'green.500' : 'red.500'}><NumberFormat value={portfolioAsset.unrealizedValue?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Td>
        <Td isNumeric color={(portfolioAsset.unrealizedValue > 0) ? 'green.500' : 'red.500'}><NumberFormat value={((portfolioAsset.unrealizedValue / portfolioAsset.totalInvested) * 100)?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Td>
        <Td isNumeric>
          <Box as="span" color={(portfolioAsset.realizedPnLShort < 0) ? 'red.500' : 'green.500'}><NumberFormat value={((portfolioAsset.realizedPnLShort))?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Box>
          <Box as="span" marginLeft="3px" marginRight="3px">|</Box>
          <Box as="span" color={(portfolioAsset.realizedPnLLong > 0) ? 'red.500' : 'green.500'}><NumberFormat value={portfolioAsset.realizedPnLLong?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Box>
        </Td>
      </>
    )
  }

  return (
    <tr>
      {getContent()}
    </tr>
   );
}

PortfolioTableRow.defaultProps = {
  linkCoins: true
};

export default PortfolioTableRow;