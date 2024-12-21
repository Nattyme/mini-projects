import React from 'react'; // need to convert into class
import Button from  './../Buttons/Buttons';

class ListItem extends React.Component {
	render () {
		const {task, isEmpty} = this.props;

		if (isEmpty) {
			return (
				<li className="todo-item justify-content-center">
 					<span className="todo-item-text">Список дел пуст</span>
 				</li>
			)
		}

		if (task) {
			return (
				<li className="todo-item">
					<span className="todo-item-text">{task.title}</span>
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