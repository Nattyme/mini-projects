const defaultState = {
  users : [
    {name: 'Jhon', id: 1},
    {name: 'Bob', id: 2},
    {name: 'Peter', id: 3}
  ],
};

const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const ADD_MANY_USERS = 'ADD_MANY_USERS'

export const usersReducer = (state = defaultState, action) => {
  
  switch (action.type) {
    case DELETE_USER:
      return {...state, users: [...state.users.filter(user=> user.id !== action.payload)]}
    case ADD_USER:
      return {...state, users: [...state.users, action.payload]}
    case ADD_MANY_USERS:
        return {...state, users: [...state.users, ...action.paylaod]}
      default : 
      return state;
  }
}

export const addUserAction = (payload) => {
  return {type: ADD_USER, payload: payload}
}

export const deleteUserAction = (payload) => {
  return {type: DELETE_USER, payload: payload}
}

export const addManyUsersAction = (payload) => {
  return {type: ADD_MANY_USERS, payload}
}