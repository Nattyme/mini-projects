import data from './../../data/data.json';
import ListItem from './../ListItem/ListItem';

import './List.css';

const List = () => {
	return (
		<ul className="todo-list">
        {
          data.length > 0 ? 
          data.map( (task) => <ListItem key={task.id} task = {task} />)
          : <ListItem isEmpty = {true} />
        }
		</ul>
	)
}

export default List;