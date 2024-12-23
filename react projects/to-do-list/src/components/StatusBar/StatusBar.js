import Button from  './../Button/Button';
import './StatusBar.css';

const StatusBar = (props) => {
	return (
		<div onClick={(e)=>{props.changeStatus(e.target.dataset.button)}} className="btn-group" role="group">
			<Button classNames={props.status === 'all' ? 'btn-primary' : 'btn-light'}  dataset={'all'} text= 'Все' />
			<Button classNames={props.status === 'active' ? 'btn-primary' : 'btn-light'} dataset={'active'} text= 'Активные' />
			<Button classNames={props.status === 'done' ? 'btn-primary' : 'btn-light'}  dataset={'done'} text= 'Выполненные' />
		</div>
	)
}

export default StatusBar;