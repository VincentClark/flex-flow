import { combineReducers } from 'redux';
import { reduce as customChatReducer } from './CustomChatState';

// Register your redux store under a unique namespace
export const namespace = 'customchat';

// Combine the reducers
export default combineReducers({
  customChatReducer: customChatReducer,
});
