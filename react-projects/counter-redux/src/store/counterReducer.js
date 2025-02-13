// Дефолтное состояние
const defaultState = {
  counter: 100,
}

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

export const counterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INCREASE :
      return {...state, counter: state.counter + action.payload}
    case DECREASE :
      return {...state, counter: state.counter - action.payload}
    default: 
      return state;
  }
}

export const increaseAction = (payload) => {
  return {type: INCREASE, payload: payload}
}

export const decreaseAction = (payload) => {
  return {type: DECREASE, payload: payload}
}