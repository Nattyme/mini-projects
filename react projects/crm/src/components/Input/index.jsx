import { useContext } from 'react';
import { AppContext } from '../../App/App';
import './style.css';

const Input = ({onChange, type, name, placeholder, id, value, required, register, className="form-control", autoComplete="on"}) => {
  const {appState, setAppState, updateFieldValue, handleBlurValue} = useContext(AppContext);
  
	return (
		<input 
      onChange = {(e)=>{onChange(e)}}
      onBlur = { (e) => {handleBlurValue(e, appState, setAppState)}}
			type={type}
			className={className} 
			name={name} 
			placeholder={placeholder}
			id={id} 
      value = {value}
			autoComplete={autoComplete} 
      {...register(name, {required: required ? "Поле обязательно для заполнения" : false})}
			required = {required}
		/>
	);
}

export default Input;