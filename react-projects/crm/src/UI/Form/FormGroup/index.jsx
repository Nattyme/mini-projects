const FormGroup = ({children, id=null}) => {
	return (
		<div className="form-group" id={id}>
			{children}
		</div>
	);
}

export default FormGroup;