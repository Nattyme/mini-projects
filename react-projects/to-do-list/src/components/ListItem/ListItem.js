import {Component} from 'react'; // need to convert into class
import Button from  './../Button/Button';

import './ListItem.css';

class ListItem extends Component {

  
	render () {
    const {task, isEmpty, toggleTask} = this.props;

    // render title for empty list 
		if (!task && isEmpty) {
			return (
				<li className="todo-item justify-content-center">
 					<span className="todo-item-text">Список дел пуст</span>
 				</li>
			)
		}


		let classNames = 'todo-item';

		// check for important task
		if (task.important) {
			classNames += ' important';
		}

		// check for done task
		if ( task.done) {
			classNames += ' done';
		}

		// render task
		if (task) {
			return (
				<li onClick={ (e)=>{toggleTask(task.id, e)} } className={classNames} data-item="task">
					<span className="todo-item-text">{task.title}</span>
					<div className="btn-group">
						<Button classNames = 'btn-outline-dark btn-sm' dataset='important'  text= 'Важное' />
						<Button classNames = 'btn-outline-danger btn-sm' dataset='remove'  text= 'Удалить' />
					</div>
				</li>
			);
		}

		return ;
	};
}

export default ListItem;