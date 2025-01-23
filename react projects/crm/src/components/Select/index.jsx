const Select = ({name, className, options, id, value}) => {

	return (
		<select id={id} name={name} className={className} value={value}>
      {
        options.map((option)=>{
          return (<option key={option.value} value={option.value}>{option.title}</option>)
        })
      }
		</select>
	);
}

export default Select;