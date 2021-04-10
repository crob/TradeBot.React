import React from 'react';
import { Box } from '@chakra-ui/react';

import H1 from '../../shared/ui/H1';

export interface ExchangeIndexProps {}

const ExchangeIndex: React.FC<ExchangeIndexProps> = () => {

  return (
    <Box>
      <H1>Exchanges</H1>
    </Box>
  );

}

export default ExchangeIndex;