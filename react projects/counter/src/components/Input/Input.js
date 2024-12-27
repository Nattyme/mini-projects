const Input = ({type, classNames, id, value, disabled, placeholder='0'}) => {
  return(
    <input 
      type={type} 
      className={classNames} 
      id={id} 
      value={value}
      placeholder= {placeholder}
      disabled = {disabled}
    />
  )
}

export default Input;