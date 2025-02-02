const defaultState = {
  users : [
    {name: 'Jhon', id: 1},
    {name: 'Bob', id: 2},
    {name: 'Peter', id: 3}
  ],
};

export const usersReducer = (state = defaultState, action) => {
  console.log('click');
  
  switch (action.type) {
    case 'DELETE_USER':
      return {...state, users: [...state.users.filter(user=> user.id !== action.payload)]}
    case 'ADD_USER':
      return {...state, users: [...state.users, action.payload]}
      default : 
      return state;
  }
}