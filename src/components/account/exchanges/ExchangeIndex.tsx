import React from 'react';
import { Box } from '@chakra-ui/react';

import H1 from '../../shared/ui/H1';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExchanges, getExchanges } from '../../../store/reducers/exchange.reducer';
import { useEffect } from 'react';

export interface ExchangeIndexProps {}

const ExchangeIndex: React.FC<ExchangeIndexProps> = () => {
  const exchanges = useSelector(getExchanges);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExchanges())
  }, [])

  console.log("exc", exchanges)
  return (
    <Box>
      <H1>Exchanges ({exchanges.length})</H1>
    </Box>
  );

}

export default ExchangeIndex;