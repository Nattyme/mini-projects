import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App/App";
import {doFilter, clickedSubNav} from "../../utils/filterFunctions";
import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from "./../../components/Title";
import Loader from "../../components/Loader";

const TablePage = () => {
  const { appState, setAppState } = useContext(AppContext);
  const titlesData = appState.pages?.tablePage || {};
  
  const title = appState?.data?.length > 0 ? titlesData?.title : titlesData?.titleNoData;
  const admin = appState.users.find((user) => user.isAdmin === true);

  useEffect(() => {
    if (appState.data) {
      const tableData = doFilter(appState.subNav, appState.data);
      setAppState((prev) => ({
        ...prev,
        filterData: tableData,
      }));
    }
  }, [appState.subNav, appState.data, setAppState]);

  return (
    <>
      {appState.data && appState.navData && admin ? (
        <>
          <SideBar isAdmin={admin} clickedSubNav={clickedSubNav} />
          <div className="main-wrapper">
            <div className="container-fluid">
              <Title title={title} />
              {appState.filterData && <Dashboard clickedSubNav={clickedSubNav}/>}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TablePage;
