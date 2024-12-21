import ListItem from './../ListItem/ListItem';

import './List.css';

const List = (props) => {
 
	return (
    
		<ul className="todo-list">
        {
          props.data.length > 0 ? 
          props.data.map( (task) => <ListItem  onToggleTask={ props.onToggleTask } key={task.id} task = {task} />)
          : <ListItem isEmpty = {true} />
        }
		</ul>
	)

}

export default List;