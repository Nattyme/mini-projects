import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {thunk} from 'redux-thunk';
import { addUserAction, deleteUserAction, addManyUsersAction } from './store/usersReducer';
import { increaseAction, decreaseAction } from './store/counterReducer';
import './App.css';


const App = () => {
  const counter = useSelector((state) => {
    console.log(state);
    return state.counter.counter;
  });

  const users = useSelector((state)=> state.users.users)

  const dispatch = useDispatch();

	const increase = (value) => {
    dispatch(increaseAction(value))
	};

	const decrease = (value) => {
    dispatch(decreaseAction(value))
	};

  const deleteUser = (id) => {
    dispatch(deleteUserAction(id));
  }

  /* Users */
  const addUser = (name) => {
    const user = {
      name: name,
      id: Date.now()
    }
    dispatch(addUserAction(user));
  }

  const showUsers = () => {
    return users.map((user) => {
      return (
        <div onClick={()=>{deleteUser(user.id)}} className="user" key={user.id}>
          {user.name}
        </div>
      )
    })
  }

  const fetchUsers = () => {
    return function (dispatch) {
      return fetch('https://jsonplaceholder.org/users')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((users) => {
          dispatch(addManyUsersAction(users))
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }



	return (
		<div className='App'>
			<h1>{counter}</h1>
			<button onClick={() => decrease(Number(prompt()))}>Уменьшить</button>
			<button onClick={() => increase(Number(prompt()))}>Увеличить</button>
      <hr/>
			<button onClick={() => addUser((prompt()))}>Добавить пользователя</button>
			<button onClick={() => dispatch(fetchUsers())}>Добавить пользователей из базы</button>
      {users.length > 0 ? showUsers() : <h3>Нет пользователей</h3>}
		</div>
	);
}

export default App;
