import './Search.css';

import Input from  './../Inputs/Input';
import Button from  './../Button/Button';

const Search = (props) => {
	return (
		<div className="search">
      <Input onchange = {(e)=>{props.changeTerm(e.target.value)}} placeholder='введите фразу для поиска'/>
 
      <div className="btn-group" role="group">
        <Button classNames='btn-primary' text= 'Все' />
        <Button classNames='btn-light' text= 'Активные' />
        <Button classNames='btn-light' text= 'Выполненные' />
      </div>
	  </div>
	)

}

export default Search;