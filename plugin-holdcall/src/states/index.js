import { combineReducers } from 'redux';

import { reduce as CustomMusicStateReducer } from './HoldMusicState';

// Register your redux store under a unique namespace
export const namespace = 'holdcall';

// Combine the reducers
export default combineReducers({
  customTaskList: CustomMusicStateReducer,
});
