import Logo from "../Logo";
import StatusBar from "../StatusBar";
import './style.css';

const SideBar = ({statusData}) => {
	return (
		<div className="left-panel blue-skin">
		
			<Logo/>
			
			<div className="left-panel__user clearfix">
				<div className="left-panel__user-photo">
				  <img src="./img/avatars/avatar-128.jpg" alt="Avatar" />
				</div>
				<div className="left-panel__user-name">Петр <br />Васильевич</div>
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