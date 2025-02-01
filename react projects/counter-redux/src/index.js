import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './App';

// Дефолтное состояние
const defaultState = {
  counter: 100,
}

//Функция reducer
// state - состояние
// action - {type: "", payload: "?"}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'INCREASE' :
      return {...state, counter: state.counter + action.payload}
    case 'DECREASE' :
      return {...state, counter: state.counter - action.payload}
    default: 
      return state;
  }
}

// Создаем store
const store = createStore(reducer)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
