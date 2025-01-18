import './style.css';

const Input = ({type, name, placeholder, id, value, required, className="form-control", autoComplete="on"}) => {
	return (
		<input 
			type={type}
			className={className} 
			name={name} 
			placeholder={placeholder}
			id={id} 
      value = {value}
			autoComplete={autoComplete} 
			required = {required}
		/>
	);
}

export default Input;