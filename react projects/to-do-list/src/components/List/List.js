import './List.css';

import Button from  './../Buttons/Buttons';

const List = () => {
return (
	<ul className="todo-list">
		<li className="todo-item justify-content-center">
			<span className="todo-item-text">Список дел пуст</span>
		</li>
		<li className="todo-item">
			<span className="todo-item-text">Выпить кофе</span>
			<div className="btn-group">
				<button role="button" className="btn btn-outline-dark btn-sm">Важное</button>
				<button role="button" className="btn btn-outline-danger btn-sm">Удалить</button>
			</div>
		</li>
		<li className="todo-item">
			<span className="todo-item-text">Сделать React приложение</span>
			<div className="btn-group">
				<button role="button" className="btn btn-outline-dark btn-sm">Важное</button>
				<button role="button" className="btn btn-outline-danger btn-sm">Удалить</button>
			</div>
		</li>
		<li className="todo-item">
			<span className="todo-item-text">Позавтракать</span>
			<div className="btn-group">
        {<Button classNames = 'btn-outline-dark btn-sm'  text= 'Важное' />}
        {<Button classNames = 'btn-outline-danger btn-sm'  text= 'Удалить' />}
			</div>
		</li>
	</ul>
)
}

export default List;