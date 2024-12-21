import React from 'react'; // need to convert into class
import Button from  './../Buttons/Buttons';

import './ListItem.css';

class ListItem extends React.Component {
	state = {
		important : false,
		done : false
	}

	// Listen task click
	taskClicked = (e) => {

		// Clicked button important
		if ( e.target.type === 'button' && e.target.classList.contains('btn-outline-dark')) {
			this.setState((state) => {
				return {
					important : !state.important
				}
			});
		}

		// Clicked task body
		if (e.target.type !== 'button' && e.target.closest('li')) {
			this.setState( (state)=> {
				return {
					done : !state.done
				}
			});
		}
	}

	render () {
		const {task, isEmpty} = this.props;
		let classNames = 'todo-item';

		// check for important task
		if (this.state.important) {
			classNames += ' important';
		}

		// check for done task
		if ( this.state.done) {
			classNames += ' done';
		}

		// render Li for empty list 
		if (isEmpty) {
			return (
				<li className="todo-item justify-content-center">
 					<span className="todo-item-text">Список дел пуст</span>
 				</li>
			)
		}

		// render Li
		if (task) {
			return (
				<li onClick={this.taskClicked} className={classNames}>
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