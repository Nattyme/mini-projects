import { useContext, useState } from 'react';
import { AppContext } from '../../App/App';
import {STATUS_CONFIG} from './../../helpers/variables'
import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from './../../components/Title';
import Loader from '../../components/Loader';

const TablePage = () => { 
  const {appState, navData} = useContext(AppContext);
  const [filterData, setFilterData] = useState(appState.data);
  const [subNav, setSubNav] = useState(STATUS_CONFIG.ALL)
  const title = appState.data && appState.data.length > 0  ? "Все заявки" : "Нет заявок";
  const admin = appState.users.find((user) => user.isAdmin === true);

  const doFilter = (e) => {
    const filterBy = e.target.dataset.value;
    return filterBy === 'all' ? [...appState.data] : [...appState.data].filter(task => task.status === filterBy);
  }

  const clickedSubNav = (e) => {
    const navList = e.target.closest('ul');

    if (navList) {
      const navItems = navList.querySelectorAll('a');
      navItems.forEach(item => item.classList.remove('active'))
    }
    
    e.target.classList.add('active');
    const tableData = doFilter(e);
    setFilterData(tableData);
    setSubNav(e.target.dataset.value);
  }
  console.log(subNav);

  return (
    <>
      {appState.data && navData && admin ? (
        <>
          <SideBar isAdmin={admin} clickedSubNav={clickedSubNav} subNav={subNav}/>
          <div className="main-wrapper">
            <div className="container-fluid">
              <Title title={title}/>
              <Dashboard filterData={filterData} setFilterData={setFilterData} subNav={subNav}/>
            </div>
          </div>   
        </>
      ) : <Loader/> }
    </>
  )

}
 
export default TablePage;