import Button from  './../Button/Button';
import './StatusBar.css';

const StatusBar = () => {
	return (
		<div className="btn-group" role="group">
			<Button classNames='btn-primary' text= 'Все' />
			<Button classNames='btn-light' text= 'Активные' />
			<Button classNames='btn-light' text= 'Выполненные' />
		</div>
	)
}

export default StatusBar;