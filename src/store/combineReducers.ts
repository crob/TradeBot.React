import { combineReducers } from 'redux';
import user, { UserState } from './reducers/user.reducer';
import portfolio, { PortfolioState } from './reducers/portfolio.reducer';
import exchanges, { ExchangeState } from './reducers/exchange.reducer';

export interface AppplicationState {
  user: UserState,
  portfolio: PortfolioState,
  exchanges: ExchangeState
}

export default combineReducers<AppplicationState>({
  user,
  portfolio,
  exchanges
});