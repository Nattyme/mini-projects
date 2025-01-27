import { useContext } from 'react';
import { AppContext } from '../../App/App';
import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from './../../components/Title';
import Loader from '../../components/Loader';

const TablePage = () => { 
  const {appState} = useContext(AppContext);
  const title = appState.data && appState.data.length > 0  ? "Все заявки" : "Нет заявок";
  const admin = appState.users.find((user) => user.isAdmin === true);
  console.log(appState);
  console.log(appState.data);
  console.log(title);
  console.log(admin);
    return (
      <>
        {appState.data && appState.navData && admin ? (
          <>
           <SideBar isAdmin={admin}/>
           <div className="main-wrapper">
             <div className="container-fluid">
               <Title title={title}/>
               <Dashboard/>
             </div>
           </div>   
          </>
        ) : <Loader/> }
      </>
    )

}
 
export default TablePage;