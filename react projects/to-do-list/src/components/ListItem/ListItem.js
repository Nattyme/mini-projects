import React from 'react'; // need to convert into class
import Button from  './../Button/Button';

import './ListItem.css';

class ListItem extends React.Component {
	render () {
		let classNames = 'todo-item';

		// check for important task
		if (this.props.task.important) {
			classNames += ' important';
		}

		// check for done task
		if ( this.props.task.done) {
			classNames += ' done';
		}

		// render Li for empty list 
		if (this.props.isEmpty) {
			return (
				<li className="todo-item justify-content-center">
 					<span className="todo-item-text">Список дел пуст</span>
 				</li>
			)
		}

		// render Li
		if (this.props.task) {
			return (
				<li onClick={ (e)=>{this.props.onToggleTask(this.props.task.id, e)} } className={classNames}>
					<span className="todo-item-text">{this.props.task.title}</span>
					<div className="btn-group">
						<Button classNames = 'btn-outline-dark btn-sm'  text= 'Важное' />
						<Button classNames = 'btn-outline-danger btn-sm'  text= 'Удалить' />
					</div>
				</li>
			);
		}

		return null;
	};
}

export default ListItem;