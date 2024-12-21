const Button = ({ type = 'button', classNames = '',  dataset = '', text = ''} ) => {
	return ( 
		<button type={type} className={`btn ${classNames}`} data-button={dataset}>
			{text}
		</button>
	)
}

export default Button;