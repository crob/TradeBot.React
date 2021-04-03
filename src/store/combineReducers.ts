import { combineReducers } from 'redux';
import user, { UserState } from './reducers/user.reducer';
import portfolio, { PortfolioState } from './reducers/portfolio.reducer';

export interface AppplicationState {
  user: UserState,
  portfolio: PortfolioState
}

export default combineReducers<AppplicationState>({
  user,
  portfolio
});