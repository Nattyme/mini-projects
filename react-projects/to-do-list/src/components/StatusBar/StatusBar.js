import Button from  './../Button/Button';
import './StatusBar.css';

const StatusBar = (props) => {
  const buttons = [
    {
      status : 'all',
      name : 'Все'
    },
    {
      status : 'active',
      name : 'Активные'
    },
    {
      status : 'done',
      name : 'Выполненные'
    }
  ];

  const getClass = (buttonStatus) => {
    return props.status === buttonStatus ? 'btn-primary' : 'btn-light';
  }

  const renderButtons = buttons.map((btn) => {
    return  <Button 
              key={btn.status}
              classNames={getClass(btn.status)}  
              dataset={btn.status} 
              text= {btn.name} 
            />
  });

	return (
		<div 
      onClick={(e)=>{props.changeStatus(e.target.dataset.button)}} 
      className="btn-group" 
      role="group">
          {renderButtons}
		</div>
	)
}

export default StatusBar;