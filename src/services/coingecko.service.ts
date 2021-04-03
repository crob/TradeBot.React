import { CoinGeckoAPI, ICoinsList, ISimplePrice } from '@coingecko/cg-api-ts';
import { priceUpdate } from '../store/reducers/portfolio.reducer';
export class CoinGeckoService {
  private static instance: CoinGeckoService;
  private userCoins: string[] = [];
  private coinGeckCoins: { response: Response; data: ICoinsList; endpoint: string; } | null = null;
  private fetchRate = 1000 * 60;
  private fetchTimer: any;
  private cg: CoinGeckoAPI;
  private dispath: any;

  constructor() {
    const fetch = window.fetch.bind(window);
    this.cg = new CoinGeckoAPI(fetch);
  }

  static getInstance(): CoinGeckoService {
    if (!this.instance) {
      this.instance = new CoinGeckoService();
    }
    return this.instance;
  }

  async fetchUserCoins(userCoins: string[], dispatch: any) {
    this.userCoins = userCoins;
    this.dispath = dispatch;

    if (!this.coinGeckCoins) {
      this.coinGeckCoins = await this.cg.getCoinsList();
    }

    this.recursiveFetch();
  }

  private async recursiveFetch() {
    const coinsToFetch = this.getCoinIds();
    if (coinsToFetch.length > 0) {
      const result = await this.cg.getSimplePrice(coinsToFetch, ['usd']);
      this.dispath(priceUpdate(this.convertResultIdsBackToTickers(result.data)));
      console.log("CG RESULT", result);
    }
    clearTimeout(this.fetchTimer);
    this.fetchTimer = setTimeout(() => {
      this.recursiveFetch();
    }, this.fetchRate);
  }

  private convertResultIdsBackToTickers(result: ISimplePrice): {[ticker: string]: number} {
    const convertedResult: {[ticker: string]: number} = {};
    for (const coinId of Object.keys(result)) {
      const cgCoin = this.coinGeckCoins?.data?.find(cgCoin => cgCoin.id.toLowerCase() === coinId.toLowerCase());
      if (cgCoin) {
        convertedResult[cgCoin.symbol?.toUpperCase()] = result[coinId].usd;
      }
    }
    return convertedResult;
  }

  private getCoinIds(): string[] {
    return this.userCoins.map(ticker => {
      return this.coinGeckCoins?.data?.find(cgCoin => cgCoin.symbol.toLowerCase() === ticker.toLowerCase())?.id || '';
    })
  }

}