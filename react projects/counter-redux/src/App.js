import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';


const App = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

	const increase = (value) => {
    dispatch({type: 'INCREASE', payload: value})
	};

	const decrease = (value) => {
    dispatch({type: 'DECREASE', payload: value})
	};

	return (
		<div className='App'>
			<h1>{counter}</h1>
			<button onClick={() => decrease(Number(prompt()))}>Уменьшить</button>
			<button onClick={() => increase(Number(prompt()))}>Увеличить</button>
		</div>
	);
}

export default App;
