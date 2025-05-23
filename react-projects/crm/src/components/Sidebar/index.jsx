import { useContext } from 'react';
import { AppContext } from '../../App/App';
import Logo from "../Logo";
import SubNav from "../SubNav";
import User from "../User";
import "./style.css";


const SideBar = ({clickedSubNav, tableState, setTableState}) => {
  const {appState} = useContext(AppContext);
  console.log(tableState);
  
  return (
    <div className="left-panel blue-skin">
      {appState?.logo && <Logo title='CRM заявки' subtitle='учебный проект webcademy'/>}

      <div className="left-panel__user clearfix">
        <User/>
      </div>

      {appState?.data && appState.data.length > 0 && (
        <div className="left-panel__navigation">
          <div className="left-panel__navigation-title">Заявки</div>
          <SubNav type="bottom" clickedSubNav={clickedSubNav} tableState={tableState} setTableState={setTableState}/>
        </div>
      )}
    </div>
  );
};

export default SideBar;
