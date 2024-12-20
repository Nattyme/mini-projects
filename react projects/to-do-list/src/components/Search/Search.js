import './Search.css';

const Search = () => {
	return (
		<div class="search">
      <input
        type="text"
        placeholder="введите фразу для поиска"
        class="form-control me-2"
      />
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-primary">Все</button>
        <button type="button" class="btn btn-light">Активные</button>
        <button type="button" class="btn btn-light">Выполненные</button>
      </div>
	  </div>
	)

}

export default Search;