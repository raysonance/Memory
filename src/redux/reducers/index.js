import { combineReducers } from 'redux';
import GameReducer from './GameReducer';
import SwitchReducer from './SwitchReducer';

let reducers = combineReducers({
  GameReducer: GameReducer,
  SwitchReducer: SwitchReducer,
});

const rootReducers = (state, action) => {
  return reducers(state, action);
};

export default rootReducers;
