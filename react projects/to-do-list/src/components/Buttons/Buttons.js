const getActiveClass = (activeStatus) => {
  if (activeStatus === true) {
    return 'btn-primary';
  } 
  if (activeStatus === false) {
    return 'btn-light';
  }

	return '';
}

const getClass = (classNames) => {
  return classNames ? classNames : '';
}

const Button = (props) => {
	return ( 
		<button type="button" className={`btn ${getActiveClass(props.active)} ${getClass(props.classNames)}`}>
			{props.text}
		</button>
	)
}


export default Button;