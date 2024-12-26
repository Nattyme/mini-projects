const Input = (props) => {
return(
	<input 
		type={props.type} 
		className={props.classNames} 
		id={props.id} 
		value={props.value}
		disabled = {props.disabled}
	/>
)
}

export default Input;