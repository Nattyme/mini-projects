
import { createStore, combineReducers} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {counterReducer} from './counterReducer';
import {usersReducer} from './usersReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer
});

export const store = createStore(rootReducer, composeWithDevTools());