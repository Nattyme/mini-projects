const Button = ({button}) => {

  return (
    <button 
      id={button.id} 
      type={button.type} 
      className={button.classNames} 
    > 
      {button.text}
    </button>
  )
}

export default Button;