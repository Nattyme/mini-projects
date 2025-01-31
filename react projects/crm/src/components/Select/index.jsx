const Select = ({name, className, options, defaultOption, id, value, onChange, register, required}) => {

	return (
		<select 
      id={id} 
      name={name} 
      className={className} 
      value={value}
      onChange = {onChange}
      {...(register ? register(name, {required}) : {})} // Связываем с react-hookform
    >
      <option value="">{defaultOption}</option>
      { options.map((option)=>{ 
          return (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          )
      }) }
		</select>
	);
}

export default Select;