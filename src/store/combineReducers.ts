import { combineReducers } from 'redux';
import user, { UserState } from './reducers/user.reducer';

export interface AppplicationState {
  user: UserState
}

export default combineReducers<AppplicationState>({
  user
});