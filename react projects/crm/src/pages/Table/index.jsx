import { useContext } from 'react';
import { AppContext } from '../../App/App';
import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from './../../components/Title';

const TablePage = () => { 
  const {data, users} = useContext(AppContext);
  const title = data && data.length > 0  ? "Все заявки" : "Нет заявок";
  const admin = users.find((user) => user.isAdmin === true);

  return (
    <>
      {data && admin && <SideBar isAdmin={admin}/>}
      <div className="main-wrapper">
        <div className="container-fluid">
          {data && admin && <Title title={title}/>}
          {data && admin && <Dashboard/>}
        </div>
      </div>    
    </>
  );
}
 
export default TablePage;