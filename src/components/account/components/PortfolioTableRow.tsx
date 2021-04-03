import { Td } from '@chakra-ui/table';
import React, { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { PortfolioAsset } from '../../../models/portfolio';

export interface PortfolioTableRowProps {
  portfolioAsset: PortfolioAsset;
}

const PortfolioTableRow: React.FC<PortfolioTableRowProps> = (props: PortfolioTableRowProps) => {
  const { portfolioAsset } = props;
  const getContent = () => {
    return (
      <>
        <Td>{portfolioAsset.coin}</Td>
        <Td isNumeric>{portfolioAsset.amount.toFixed(3)}</Td>
        <Td isNumeric><NumberFormat value={portfolioAsset.totalValue?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Td>
        <Td isNumeric color={(portfolioAsset.unrealizedValue > 0) ? 'green.500' : 'red.500'}><NumberFormat value={portfolioAsset.unrealizedValue?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Td>
        <Td isNumeric color={(portfolioAsset.unrealizedValue > 0) ? 'green.500' : 'red.500'}><NumberFormat value={((portfolioAsset.unrealizedValue / portfolioAsset.total) * 100)?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} suffix={'%'} /></Td>
        <Td isNumeric><NumberFormat value={portfolioAsset.currentPrice?.toFixed(2)} defaultValue={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Td>
        <Td isNumeric><NumberFormat value={portfolioAsset.total.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Td>
        <Td isNumeric><NumberFormat value={portfolioAsset.averagePrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Td>
      </>
    )
  }

  return (
    <tr>
      {getContent()}
    </tr>
   );
}

export default PortfolioTableRow;