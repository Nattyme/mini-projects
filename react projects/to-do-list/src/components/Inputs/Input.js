const Input = (props) => {
	return (
		<input
			type={props.type}
			placeholder={props.placeholder}
			className={props.classNames}
		/>
	)
}

export default Input;