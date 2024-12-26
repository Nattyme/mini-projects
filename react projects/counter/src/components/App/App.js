import Input from './../Input/Input';
import Button from './../Button/Button';
import './App.css';

const App = () => {
const buttons = [
	{
	id : 'btnMinus',
	type : 'button',
	classNames : 'btn btn-outline-primary',
	text : 'Minus'
	},
	{
	id : 'btnReset',
	type : 'button',
	classNames : 'btn btn-outline-primary',
	text : 'Reset'
	},
	{
	id : 'btnPlus',
	type : 'button',
	classNames : 'btn btn-outline-primary',
	text : 'Plus'
	}
];

// Render al buttons on page`
const renderButtons = buttons.map( (button) => {
	return  <Button
				id = { button.id}
				type = {button.type}
				classNames = {button.classNames}
				text = {button.text}
			/>
});

return (
	<div className = 'app p-3'>
	<h1>Counter</h1>
	<Input/>

	<div className="btn-group" role="group" aria-label="Basic example">
		{renderButtons}
	</div>
	</div>
)
}

export default App;
