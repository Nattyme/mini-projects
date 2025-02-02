// Дефолтное состояние
const defaultState = {
  counter: 100,
}

//Функция reducer
// state - состояние
// action - {type: "", payload: "?"}

export const counterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'INCREASE' :
      return {...state, counter: state.counter + action.payload}
    case 'DECREASE' :
      return {...state, counter: state.counter - action.payload}
    default: 
      return state;
  }
}
