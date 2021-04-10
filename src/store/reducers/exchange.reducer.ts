import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exchange } from '../../models/exchange';
import { Portfolio, PortfolioAsset } from '../../models/portfolio';
import { AppplicationState } from '../combineReducers';
import { apiCallBegan } from '../middleware/api-middleware';


export interface ExchangeState {
  exchanges: Exchange[];
  loading: boolean;
}

const initState: ExchangeState = {
  exchanges: [],
  loading: false
};

const slice = createSlice({
  name: "exchanges",
  initialState: initState,
  reducers: {
    exchangesRequested: (exchangeState: ExchangeState, action: PayloadAction<Exchange[]>) => {
      exchangeState.loading = true;
    },
    exchangesRequestFailed: (exchangeState: ExchangeState, action: PayloadAction) => {
      exchangeState.loading = false;
      exchangeState.exchanges = [];
    },
    exchangesReceived: (exchangeState: ExchangeState, action: PayloadAction<Exchange[]>) => {
      exchangeState.loading = false;
      exchangeState.exchanges  = action.payload;
    }
  },
});

export const {
  exchangesRequested,
  exchangesRequestFailed,
  exchangesReceived
} = slice.actions;

export default slice.reducer;


export const getExchangesState = (state: AppplicationState): Exchange[] => state.exchanges.exchanges;

export const getExchangesStateById = (exchangeId: number) => (state: AppplicationState): Exchange | undefined => (
  state.exchanges.exchanges?.find((exchange: Exchange) => exchange.id === exchangeId)
)

export const fetchExchanges = () => (dispatch: any, getstate: AppplicationState) => {
  return dispatch(
    apiCallBegan({
      url: "exchanges",
      onStart: exchangesRequested.type,
      onSuccess: exchangesReceived.type,
      onError: exchangesRequestFailed.type,
    })
  );
};