import { useContext } from 'react';
import { AppContext } from '../../App/App';
import './style.css';

const Input = ({type, name, placeholder, id, value, required, className="form-control", autoComplete="on"}) => {
  const {updateFieldValue, handleBlurValue} = useContext(AppContext);
	return (
		<input 
      onChange = {(e) => {updateFieldValue(e.target.id, e.target.value)}}
      onBlur = { (e) => {handleBlurValue(e)}}
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