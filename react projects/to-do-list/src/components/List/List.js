import './List.css';
import data from './../../data/data.json';
import ListItem from './../ListItem/ListItem';

const getTitle = (tasksExist) => {
	return (
		<li className="todo-item justify-content-center">
			<span className="todo-item-text">{tasksExist ? 'Список дел' : 'Список дел пуст'}</span>
		</li>
	);
}

const List = () => {
  const tasksExist = data.length > 0;

	return (
		<ul className="todo-list">
      { getTitle(tasksExist) }
      {<ListItem tasks= {data} />}
		</ul>
	)
}

export default List;