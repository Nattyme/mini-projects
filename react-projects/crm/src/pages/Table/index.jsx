import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App/App";
import {clickedSubNav} from "../../utils/filterFunctions";
import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from "./../../components/Title";
import Loader from "../../components/Loader";

const TablePage = () => {
  const { appState } = useContext(AppContext);
  const titlesData = appState.pages?.tablePage || {};
  
  const title = appState?.data?.length > 0 ? titlesData?.title : titlesData?.titleNoData;
  const admin = appState.users.find((user) => user.isAdmin === true);


  return (
    <>
      {appState.data && appState.navData && admin ? (
        <>
          {appState.data && <SideBar isAdmin={admin} clickedSubNav={clickedSubNav} />}
          <div className="main-wrapper">
            <div className="container-fluid">
              <Title title={title} />
              {appState.data ? <Dashboard clickedSubNav={clickedSubNav}/> : <Loader />}
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
