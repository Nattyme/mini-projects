
import { createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {counterReducer} from './counterReducer';
import {usersReducer} from './usersReducer';
import thunk from 'redux-thunk'; 

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));