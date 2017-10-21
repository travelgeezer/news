import { combineReducers } from 'redux';
import recycleState from 'redux-recycle';
import home, { initialHomeState } from './home';
import nav from './nav';

const RESET_STATE = 'RESET_STATE';

const reducers = combineReducers({
  home: recycleState(home, [RESET_STATE], initialHomeState),
  nav
});

export default reducers;
