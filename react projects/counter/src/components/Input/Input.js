const Input = ({id, type, classNames, disabled, value, placeholder='0'}) => {
  return(
    <input 
      id={id} 
      type={type} 
      className={classNames} 
      disabled = {disabled}
      value={value}
      placeholder= {placeholder}
    />
  )
}

export default Input;