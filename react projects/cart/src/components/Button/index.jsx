import './style.scss';

const Button = ({title, onclick}) => {
	return <button className = 'button' onClick = {onclick}>{title}</button>;
}

export default Button;