import { useContext } from 'react';
import { AppContext } from '../../App/App';
import Logo from "../Logo";
import SubNav from "../SubNav";
import User from "../User";
import "./style.css";

const SideBar = ({isAdmin, clickedSubNav}) => {
  const {appState} = useContext(AppContext);
  const {title = '', subtitle = ''}= appState?.logo || {}; // Получаем данные по лого, если нет - пустое знач-е
  
  return (
    <div className="left-panel blue-skin">
      {appState?.logo && <Logo title={title} subtitle={subtitle}/>}

      <div className="left-panel__user clearfix">
        {isAdmin && <User user = {isAdmin}/>}
      </div>

      {appState?.data && appState.data.length > 0 && (
        <div className="left-panel__navigation">
          <div className="left-panel__navigation-title">Заявки</div>
          <SubNav type="bottom" clickedSubNav={clickedSubNav}/>
        </div>
      )}
    </div>
  );
};

export default SideBar;
