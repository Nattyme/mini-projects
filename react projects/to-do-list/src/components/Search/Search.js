import './Search.css';

import Button from  './../Buttons/Buttons';

const Search = () => {
	return (
		<div className="search">
      <input
        type="text"
        placeholder="введите фразу для поиска"
        className="form-control me-2"
      />
      <div className="btn-group" role="group">
        {<Button active = {true} text= 'Все' />}
        {<Button active = {false} text= 'Активные' />}
        {<Button active = {false} text= 'Выполненные' />}
      </div>
	  </div>
	)

}

export default Search;