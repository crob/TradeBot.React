import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exchange } from '../../models/exchange';
import { ServerError } from '../../models/server-error';
import { AppplicationState } from '../combineReducers';
import { apiCallBegan } from '../middleware/api-middleware';


export interface ExchangeState {
  exchanges: Exchange[];
  loading: boolean;
  isSaving: boolean;
  errors: ServerError | null;
}

const initState: ExchangeState = {
  exchanges: [],
  loading: false,
  isSaving: false,
  errors: null
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
    },
    addExchangeRequested: (exchangeState: ExchangeState, action: PayloadAction<Exchange[]>) => {
      exchangeState.isSaving = true;
    },
    addEexchangeRequestFailed: (exchangeState: ExchangeState, action: PayloadAction<ServerError>) => {
      exchangeState.isSaving = false;
      exchangeState.errors = action.payload;
    },
    addEexchangeReceived: (exchangeState: ExchangeState, action: PayloadAction<Exchange>) => {
      exchangeState.isSaving = false;
      exchangeState.exchanges  = [...exchangeState.exchanges, action.payload];
    }
  },
});

export const {
  exchangesRequested,
  exchangesRequestFailed,
  exchangesReceived,
  addExchangeRequested,
  addEexchangeRequestFailed,
  addEexchangeReceived
} = slice.actions;

export default slice.reducer;

export const getExchangesState = (state: AppplicationState): ExchangeState => state.exchanges;

export const getExchanges = (state: AppplicationState): Exchange[] => state.exchanges.exchanges;

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

export const saveNewExchange = (data: Partial<Exchange>) => (dispatch: any, getstate: AppplicationState) => {
  return dispatch(
    apiCallBegan({
      url: "exchanges/add",
      method: "post",
      data,
      onStart: addExchangeRequested.type,
      onSuccess: addEexchangeReceived.type,
      onError: addEexchangeRequestFailed.type,
    })
  );
};
