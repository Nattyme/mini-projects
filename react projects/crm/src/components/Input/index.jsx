import { useContext } from 'react';
import { AppContext } from '../../App/App';
import './style.css';

const Input = ({type, name, placeholder, id, value, required, className="form-control", autoComplete="on"}) => {
  const {updateInputValue} = useContext(AppContext);
	return (
		<input 
      onChange = {(e) => {updateInputValue(e.target.id, e.target.value)}}
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