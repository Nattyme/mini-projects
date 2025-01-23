import { useContext } from 'react';
import { AppContext } from '../../App/App';

const Select = ({name, className, options, id, value}) => {
  const {updateFieldValue} = useContext(AppContext);

	return (
		<select 
      id={id} 
      name={name} 
      className={className} 
      value={value}
      onChange = {(e) => {updateFieldValue(e.target.id, e.target.value)}}
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