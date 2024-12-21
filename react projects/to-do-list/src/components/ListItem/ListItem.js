import Button from  './../Buttons/Buttons';

const ListItem = ( {tasks} ) => {
  return tasks.map( (el) => {
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

export default ListItem;