import ListItem from './../ListItem/ListItem';

import './List.css';

const List = (props) => {
	return (
    
		<ul className="todo-list">
        {
          props.data.length > 0 ? 
          props.data.map( (task) => <ListItem  toggleTask={ props.toggleTask } key={task.id} task = {task} />)
          : <ListItem isEmpty = {true} />
        }
		</ul>
	)

}

export default List;