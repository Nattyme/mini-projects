import './style.css';

const Input = ({type, name, placeholder, id, required, className="form-control", autoComplete="on"}) => {
	return (
		<input 
			type={type}
			className={className} 
			name={name} 
			placeholder={placeholder}
			id={id} 
			autoComplete={autoComplete} 
			required = {required}
		/>
	);
}

export default Input;