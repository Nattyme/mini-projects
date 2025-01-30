import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App/App";
import {doFilter, clickedSubNav} from "../../utils/filterFunctions";
import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from "./../../components/Title";
import Loader from "../../components/Loader";

const TablePage = () => {
  const { appState, setAppState, navData } = useContext(AppContext);
  const title = appState.data && appState.data.length > 0 ? "Все заявки" : "Нет заявок";
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
      {appState.data && navData && admin ? (
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
