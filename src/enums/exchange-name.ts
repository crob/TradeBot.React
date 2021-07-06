
export enum ExchangeName {
  COINBASEPRO = 'COINBASEPRO',
  BITSTAMP = 'BITSTAMP',
  KRAKEN = 'KRAKEN',
}

export const ExchangeNameText: { [key in ExchangeName]: string } = {
  [ExchangeName.COINBASEPRO]: "Coinbase Pro (GDAX)",
  [ExchangeName.BITSTAMP]: "BitStamp",
  [ExchangeName.KRAKEN]: "Kraken",
};
