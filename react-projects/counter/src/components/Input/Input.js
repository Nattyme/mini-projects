const Input = ({input, term}) => {

  return(
    <input 
      id={input.id} 
      type={input.type} 
      className={input.classNames} 
      disabled = {input.disabled}
      value={input.value}
      placeholder= {term}
    />
  )
}

export default Input;