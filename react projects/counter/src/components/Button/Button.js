const Button = (props) => {

  return (
    <button 
      type={props.type} 
      className={props.classNames} 
      id={props.id} 
    > 
      {props.text}
    </button>
  )
}

export default Button;