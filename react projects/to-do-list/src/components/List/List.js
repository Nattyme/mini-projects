import './List.css';

import data from './../../data/data.json';
import Button from  './../Buttons/Buttons';

const getTitle = (tasksExist) => {
	const text = tasksExist ? 'Список дел' : 'Список дел пуст';

	return (
		<li className="todo-item justify-content-center">
			<span className="todo-item-text">{text}</span>
		</li>
	);
}

const tasksExist = (data) => {
	return data.length > 0 ? true : false;
}

const renderTasks = (data) => {
	return data.map( (el) => {
		return (
			<li key={el.id} className="todo-item">
				<span className="todo-item-text">{el.title}</span>
				<div className="btn-group">
					<Button classNames = 'btn-outline-dark btn-sm'  text= 'Важное' />
					<Button classNames = 'btn-outline-danger btn-sm'  text= 'Удалить' />
				</div>
			</li>
		)
	});
}


const List = () => {
	return (
		<ul className="todo-list">
			{ getTitle( tasksExist(data) )}
			{ renderTasks( data ) }
		</ul>
	)
}

export default List;