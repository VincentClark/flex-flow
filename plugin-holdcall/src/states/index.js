import { combineReducers, createStore } from 'redux';
import { reduce as holdMusicState } from './HoldMusicState';
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const namespace = 'holdcall';

//REDUCERS

// Combine the reducers
export default combineReducers({
  holdMusicState: holdMusicState,
});

//DISPATCH
