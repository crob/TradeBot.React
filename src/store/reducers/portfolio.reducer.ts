import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Portfolio, PortfolioAsset } from '../../models/portfolio';
import { AppplicationState } from '../combineReducers';
import { apiCallBegan } from '../middleware/api-middleware';


export interface PortfolioState {
  portfolio: Portfolio | null;
  loading: boolean;
  loadingAssets: boolean;
  hasFetchedHoldings: boolean;
}

const initState: PortfolioState = {
  portfolio: null,
  loading: false,
  loadingAssets: false,
  hasFetchedHoldings: false
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

    },
    portfolioAssetsRequested: (portfolioState: PortfolioState, action: PayloadAction<PortfolioAsset[]>) => {
      portfolioState.loadingAssets = true;
    },
    portfolioAssetsRequestFailed: (portfolioState: PortfolioState, action: PayloadAction) => {
      portfolioState.loadingAssets = false;
    },
    portfolioAssetsReceived: (portfolioState: PortfolioState, action: PayloadAction<PortfolioAsset[]>) => {
      portfolioState.loadingAssets = false;
      portfolioState.hasFetchedHoldings = true;
      action.payload = action.payload.map((portfolioAssetWithHolding: PortfolioAsset) => {
        const currentPortfolioAsset = portfolioState.portfolio?.portfolioAssets?.find((portfolioAsset: PortfolioAsset) => portfolioAsset.id === portfolioAssetWithHolding.id)
        return {...currentPortfolioAsset, ...portfolioAssetWithHolding};
      })
      portfolioState.portfolio!.portfolioAssets = [];
      portfolioState.portfolio!.portfolioAssets  = action.payload;
    },
    portfolioSyncRequested: (portfolioState: PortfolioState, action: PayloadAction<Portfolio>) => {},
    portfolioSyncRequestFailed: (portfolioState: PortfolioState, action: PayloadAction) => {},
    portfolioSyncReceived: (portfolioState: PortfolioState, action: PayloadAction<Portfolio>) => {
      portfolioState.portfolio  = action.payload;
    },
  },
});

export const {
  portfolioRequested,
  portfolioRequestFailed,
  portfolioReceived,
  priceUpdate,
  portfolioAssetsRequested,
  portfolioAssetsRequestFailed,
  portfolioAssetsReceived,
  portfolioSyncRequested,
  portfolioSyncRequestFailed,
  portfolioSyncReceived
} = slice.actions;

export default slice.reducer;

export const getPortfolio = (state: AppplicationState): Portfolio | null => state.portfolio.portfolio;
export const getPortfolioState = (state: AppplicationState): PortfolioState => state.portfolio;
export const getPortfolioAssetById = (id: number) => (state: AppplicationState): PortfolioAsset | undefined => (
  state.portfolio.portfolio?.portfolioAssets?.find((portfolioAsset: PortfolioAsset) => portfolioAsset.id === id)
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

export const syncPortfolio = () => (dispatch: any, getState: any) => {
  return dispatch(
    apiCallBegan({
      url: "portfolio/sync",
      onStart: portfolioSyncRequested.type,
      onSuccess: portfolioSyncReceived.type,
      onError: portfolioSyncRequestFailed.type,
    })
  );
};

export const fetchPortfolioAssets = () => (dispatch: any, getstate: AppplicationState) => {
  return dispatch(
    apiCallBegan({
      url: "portfolio/assets",
      onStart: portfolioAssetsRequested.type,
      onSuccess: portfolioAssetsReceived.type,
      onError: portfolioAssetsReceived.type,
    })
  );
};