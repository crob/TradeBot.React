import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { Portfolio } from '../../models/portfolio';


export interface PortfolioState {
  portfolio: Portfolio | null;
}

const initState: PortfolioState = {
  portfolio: null
};

const slice = createSlice({
  name: "portfolio",
  initialState: initState,
  reducers: {
    portfolioReceived: (portfolioState: PortfolioState, action: PayloadAction<Portfolio>) => {
      portfolioState.portfolio  = action.payload;
    },
    priceUpdate: (portfolioState: PortfolioState, action: PayloadAction<{[coin: string]: number}>) => {
      for (const coinKey of Object.keys(action.payload)) {
        const portfolioAsset = portfolioState?.portfolio?.portfolioAssets.find((pa) => pa.coin.toLowerCase() === coinKey.toLowerCase());
        if (portfolioAsset) {
          portfolioAsset.currentPrice = action.payload[coinKey];
          portfolioAsset.totalValue = portfolioAsset.currentPrice * portfolioAsset.amount;
          portfolioAsset.unrealizedValue = portfolioAsset.totalValue - portfolioAsset.total; // need to rename total to invested
        }
      }

    }
  },
});

export const {
  portfolioReceived,
  priceUpdate
} = slice.actions;

export default slice.reducer;

export const getPortfolioState = (state: any) => state.portfolio.portfolio;