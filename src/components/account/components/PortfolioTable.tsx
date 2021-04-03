import { Table, TableCaption, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Portfolio, PortfolioAsset } from '../../../models/portfolio';
import { getPortfolioState } from '../../../store/reducers/portfolio.reducer';
import PortfolioTableRow from './PortfolioTableRow';

export interface PortfolioTableProps {}

const PortfolioTable: React.FC<PortfolioTableProps> = () => {
  const portfolioState: Portfolio | null = useSelector(getPortfolioState);
  useEffect(() => {}, [portfolioState]);

  const getSortedArray = () => {
    return [...portfolioState?.portfolioAssets || []].sort((a, b) => (a.totalValue < b.totalValue) ? 1 : -1 );
  }

  const getContent = () => {
    return (
      <Table variant="striped" size="lg" colorScheme="whiteAlpha">
        <TableCaption>How much crypto do you have? Not enough.</TableCaption>
        <Thead>
          <Tr>
            <Th color="white">Coin</Th>
            <Th color="white" isNumeric>Hodlings</Th>
            <Th color="white" isNumeric>Total</Th>
            <Th color="white" isNumeric>PnL</Th>
            <Th color="white" isNumeric>PnL %</Th>
            <Th color="white" isNumeric>Current Price</Th>
            <Th color="white" isNumeric>Investment</Th>
            <Th color="white" isNumeric>Average Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {getSortedArray()?.map((portfolioAsset: PortfolioAsset) => <PortfolioTableRow key={portfolioAsset.id} portfolioAsset={portfolioAsset} />)}
        </Tbody>
      </Table>
    )
  }

  return (
    <>
      {(portfolioState) ? getContent() : ''}
    </>
   );
}

export default PortfolioTable;