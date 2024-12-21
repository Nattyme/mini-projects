const Input = ({type = 'text', placeholder = 'Введите текст', classNames = 'form-control me-2'}) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={classNames}
		/>
	)
}

export default Input;