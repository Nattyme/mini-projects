const Select = ({name, className, options, id, value, onChange}) => {
	return (
		<select 
      id={id} 
      name={name} 
      className={className} 
      value={value}
      onChange = {onChange}
    >
      {
        options.map((option)=>{
          return (<option key={option.value} value={option.value}>{option.title}</option>)
        })
      }
		</select>
	);
}

export default Select;