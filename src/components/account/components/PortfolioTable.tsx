import { Table, TableCaption, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { PortfolioAsset } from '../../../models/portfolio';
import PortfolioTableRow from './PortfolioTableRow';

export interface PortfolioTableProps {
  portfolioAssets: PortfolioAsset[] | undefined,
  linkCoins?: boolean
}

const PortfolioTable: React.FC<PortfolioTableProps> = (props: PortfolioTableProps) => {
  const getSortedArray = () => {
    return [...props?.portfolioAssets || []].sort((a, b) => (a.totalValue < b.totalValue) ? 1 : -1 );
  }

  const getContent = () => {
    return (
      <Table variant="striped" size="lg" colorScheme="whiteAlpha">
        <TableCaption>How much crypto do you have? Not enough.</TableCaption>
        <Thead>
          <Tr>
            <Th color="white">Coin</Th>
            <Th color="white" isNumeric>Hodlings</Th>
            <Th color="white" isNumeric>%</Th>
            <Th color="white" isNumeric>Current Price</Th>
            <Th color="white" isNumeric>Average Price</Th>
            <Th color="white" isNumeric>Total</Th>
            <Th color="white" isNumeric>Investment</Th>
            <Th color="white" isNumeric>PnL</Th>
            <Th color="white" isNumeric>PnL %</Th>
            <Th color="white" isNumeric>Realized PnL S|L</Th>
          </Tr>
        </Thead>
        <Tbody>
          {getSortedArray()?.map((portfolioAsset: PortfolioAsset) => <PortfolioTableRow linkCoins={props.linkCoins} key={portfolioAsset.id} portfolioAsset={portfolioAsset} />)}
        </Tbody>
      </Table>
    )
  }

  return (
    <>
      {(props.portfolioAssets && props.portfolioAssets?.length > 0) ? getContent() : ''}
    </>
   );
}

PortfolioTable.defaultProps = {
  linkCoins: true
};

export default PortfolioTable;