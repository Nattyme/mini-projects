import Button from  './../Button/Button';
import './StatusBar.css';

const StatusBar = (props) => {
  const getClass = (buttonStatus) => {
    return props.status === buttonStatus ? 'btn-primary' : 'btn-light';
  }

	return (
		<div onClick={(e)=>{props.changeStatus(e.target.dataset.button)}} className="btn-group" role="group">
			<Button classNames={getClass('all')}  dataset={'all'} text= 'Все' />
			<Button classNames={getClass('active')} dataset={'active'} text= 'Активные' />
			<Button classNames={getClass('done')}  dataset={'done'} text= 'Выполненные' />
		</div>
	)
}

export default StatusBar;