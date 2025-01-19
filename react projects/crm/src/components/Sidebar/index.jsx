import Logo from "../Logo";
import StatusBar from "../StatusBar";
import User from "../User";
import './style.css';

const SideBar = ({statusData}) => {
	return (
		<div className="left-panel blue-skin">
		
			<Logo title = "CRM заявки" subtitle = "учебный проект webcademy"/>
			
			<div className="left-panel__user clearfix">
				<User/>
			</div>

      { statusData.length > 0 && 
      <div className="left-panel__navigation">
        <div className="left-panel__navigation-title">Заявки</div>
        <StatusBar type="bottom" statusData = {statusData}/>
      </div>
      }
			
		</div>
	);
}

export default SideBar;