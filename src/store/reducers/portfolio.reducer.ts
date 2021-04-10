import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { Portfolio, PortfolioAsset } from '../../models/portfolio';
import { AppplicationState } from '../combineReducers';
import { apiCallBegan } from '../middleware/api-middleware';


export interface PortfolioState {
  portfolio: Portfolio | null;
  loading: boolean;
}

const initState: PortfolioState = {
  portfolio: null,
  loading: false
};

const slice = createSlice({
  name: "portfolio",
  initialState: initState,
  reducers: {
    portfolioRequested: (portfolioState: PortfolioState, action: PayloadAction<Portfolio>) => {
      portfolioState.loading = true;
    },
    portfolioRequestFailed: (portfolioState: PortfolioState, action: PayloadAction) => {
      portfolioState.loading = false;
      portfolioState.portfolio = null;
    },
    portfolioReceived: (portfolioState: PortfolioState, action: PayloadAction<Portfolio>) => {
      portfolioState.loading = false;
      portfolioState.portfolio  = action.payload;
    },
    priceUpdate: (portfolioState: PortfolioState, action: PayloadAction<{[coin: string]: number}>) => {
      const totalValue = portfolioState?.portfolio?.portfolioAssets?.map((portfolioAsset: PortfolioAsset) => portfolioAsset.totalValue).reduce((p: number, c: number) => p += c, 0) || 0;
      for (const coinKey of Object.keys(action.payload)) {
        const portfolioAsset = portfolioState?.portfolio?.portfolioAssets.find((pa) => pa.coin.toLowerCase() === coinKey.toLowerCase());
        if (portfolioAsset) {
          portfolioAsset.currentPrice = action.payload[coinKey];
          portfolioAsset.totalValue = portfolioAsset.currentPrice * portfolioAsset.amount;
          portfolioAsset.unrealizedValue = portfolioAsset.totalValue - portfolioAsset.totalInvested;
          portfolioAsset.percentageOfPortfolio = (portfolioAsset.totalValue / totalValue) * 100;
        }
      }

    }
  },
});

export const {
  portfolioRequested,
  portfolioRequestFailed,
  portfolioReceived,
  priceUpdate
} = slice.actions;

export default slice.reducer;

export const getPortfolioState = (state: AppplicationState): Portfolio | null => state.portfolio.portfolio;
export const getPortfolioAssetByCoin = (coin: string) => (state: AppplicationState): PortfolioAsset | undefined => (
  state.portfolio.portfolio?.portfolioAssets?.find((portfolioAsset: PortfolioAsset) => portfolioAsset.coin === coin)
)

export const fetchPortfolio = () => (dispatch: any, getState: any) => {
  return dispatch(
    apiCallBegan({
      url: "portfolio",
      onStart: portfolioRequested.type,
      onSuccess: portfolioReceived.type,
      onError: portfolioRequestFailed.type,
    })
  );
};