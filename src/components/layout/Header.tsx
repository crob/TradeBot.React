import React from 'react';
import { Link } from '../shared/chakra-link-fix';

function Header() {
  return (
    <header>
      <Link color="white" to="/">TradeBot 3000</Link>
    </header>
  );
}

export default Header;