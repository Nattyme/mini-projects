import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../App/App";
import { formatDataInTable } from "../../utils/formatters";
import { doFilter } from "../../utils/filterFunctions";
import { clickedSubNav } from "../../utils/filterFunctions";
import { STATUS_CONFIG } from "./../../helpers/variables";
import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from "../../components/Title";
import Loader from "../../components/Loader";

const TablePage = () => {
  const { appState } = useContext(AppContext);
  const [tableState, setTableState] = useState(
    {
      select: null,
      status: null,
      subNav: STATUS_CONFIG.ALL,
      filterData: appState.data,
      users: null,
      countedField: null
    },
    []
  );
console.log(appState);
console.log(tableState);
 
  const title = appState?.data?.length > 0 ? 'Все заявки' : 'Нет заявок';

  // Изменение фильтра
  useEffect(() => {
    if (tableState.filterData) {
      let filteredData = doFilter("subNav", tableState.subNav, appState.data);

      if (appState.select) {
        filteredData = doFilter("select", tableState.select, appState.data);
      }

      setTableState((prev) => ({
        ...prev,
        filterData: filteredData,
      }));
    }
  }, [tableState.subNav, tableState.select, appState.data]);

  const sortData = useCallback((data) => {
    console.log(tableState);

    return [...data].sort((current, next) => next.id - current.id);
  }, []); // Для сортировки не нужны зависимости

  // Отсортированные данные сохраняем в memo
  const sortedData = useMemo(
    () => sortData(tableState.filterData),
    [tableState.filterData, sortData]
  );
  const formattedData = useMemo(() => {
    return sortedData.map((data) =>
      formatDataInTable(data, appState.products, appState.status)
    );
  }, [sortedData, appState.products, appState.status]);

  return (
    <>
      {appState.data && appState.navData ? (
        <>
          {appState.data && (
            <SideBar clickedSubNav={clickedSubNav} tableState={tableState} setTableState={setTableState}/>
          )}

          <div className="main-wrapper">
            <div className="container-fluid">

              <Title title={title} />

              {appState.data ? (
                <Dashboard 
                  setTableState= {setTableState} 
                  clickedSubNav={clickedSubNav} 
                  formattedData={formattedData} 
                  tableState={tableState}/>
              ) : (
                <Loader />
              )}

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
