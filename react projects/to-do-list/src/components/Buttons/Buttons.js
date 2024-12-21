const Button = ({type ='button', classNames, text}) => {
	return ( 
		<button type={type} className={`btn ${classNames || ''}`}>
			{text}
		</button>
	)
}

export default Button;