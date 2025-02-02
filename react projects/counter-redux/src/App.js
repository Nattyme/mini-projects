import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';


const App = () => {
  const counter = useSelector((state) => {
    console.log(state);
    return state.counter.counter;
  });
  const users = useSelector((state)=> state.users.users)

  const dispatch = useDispatch();

	const increase = (value) => {
    dispatch({type: 'INCREASE', payload: value})
	};

	const decrease = (value) => {
    dispatch({type: 'DECREASE', payload: value})
	};

  const deleteUser = (id) => {
    dispatch({type: 'DELETE_USER', payload: id})
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

	return (
		<div className='App'>
			<h1>{counter}</h1>
			<button onClick={() => decrease(Number(prompt()))}>Уменьшить</button>
			<button onClick={() => increase(Number(prompt()))}>Увеличить</button>
      {users.length > 0 ? showUsers() : <h3>Нет пользователей</h3>}
		</div>
	);
}

export default App;
