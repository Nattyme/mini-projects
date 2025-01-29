import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App/App';
import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from './../../components/Title';
import Loader from '../../components/Loader';
import {subNavTop, subNavAside} from './../../helpers/variables'

const TablePage = () => { 
  const {appState, navData} = useContext(AppContext);
  const [filterData, setFilterData] = useState(appState.data);
  const title = appState.data && appState.data.length > 0  ? "Все заявки" : "Нет заявок";
  const admin = appState.users.find((user) => user.isAdmin === true);

    return (
      <>
        {appState.data && navData && admin ? (
          <>
           <SideBar isAdmin={admin} filterData={filterData} setFilterData={setFilterData}/>
           <div className="main-wrapper">
             <div className="container-fluid">
                <Title title={title}/>
                <Dashboard filterData={filterData} setFilterData={setFilterData}/>
             </div>
           </div>   
          </>
        ) : <Loader/> }
      </>
    )

}
 
export default TablePage;