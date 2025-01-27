import { useContext } from 'react';
import { AppContext } from '../../App/App';
import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from './../../components/Title';

const TablePage = () => { 
  const {data, users, navData} = useContext(AppContext);
  
  const title = data && data.length > 0  ? "Все заявки" : "Нет заявок";
  const admin = users.find((user) => user.isAdmin === true);

  return (
    <>
      {data && navData && admin && <SideBar isAdmin={admin}/>}
      <div className="main-wrapper">
        <div className="container-fluid">
          {data && navData && admin && <Title title={title}/>}
          {data && navData && admin && <Dashboard/>}
        </div>
      </div>    
    </>
  );
}
 
export default TablePage;