import Logo from "../Logo";
import SubNav from "../SubNav";
import User from "../User";
import "./style.css";

const SideBar = ({ statusData }) => {

  return (
    <div className="left-panel blue-skin">
      <Logo title="CRM заявки" subtitle="учебный проект webcademy" />

      <div className="left-panel__user clearfix">
        <User />
      </div>

      {statusData.length > 0 && (
        <div className="left-panel__navigation">
          <div className="left-panel__navigation-title">Заявки</div>
          <SubNav type="bottom" data={statusData} />
        </div>
      )}
    </div>
  );
};

export default SideBar;
