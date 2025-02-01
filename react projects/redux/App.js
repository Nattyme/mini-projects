import { useState } from 'react';
import './App.css';


function App() {
	const [counter, setCounter] = useState(0);

	const increase = (value) => {
		setCounter((current) => current + value);
	};

	const decrease = (value) => {
		setCounter((current) => current - value);
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
