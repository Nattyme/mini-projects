import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../App/App";
import { formatDataInTable } from "../../utils/formatters";
import { doFilter } from "../../utils/filterFunctions";
import { clickedSubNav } from "../../utils/filterFunctions";
import { serverPath, STATUS_CONFIG } from "./../../helpers/variables";
import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from "../../components/Title";
import Loader from "../../components/Loader";
import { useLocation } from "react-router-dom";

const TablePage = () => {
  const { appState } = useContext(AppContext);
  const location = useLocation();
  const [tableState, setTableState] = useState(
    {
      select: null,
      status: null,
      subNav: STATUS_CONFIG.ALL,
      products: appState.products,
      filterData: null,
      users: null,
      countedField: null,
      error: null,
      loading: null
    },
    []
  );

 
   // Получение данных с сервера
  const getFetchData = (fieldsObj) => {
      fieldsObj.forEach(({ field, path }) => {
        fetch(serverPath + path)
          .then((res) => res.json())
          .then((data) => {
            // Обновление полей
            setTableState((prevState) => ({
              ...prevState,
              [field]: data,
              loading: false,
            }));
          })
          .catch((error) => {
            setTableState((prevState) => ({
              ...prevState,
              error: error,
              loading: false,
            }));
          });
      });
  };
  
  // Получает данные с сервера при измненеии url
  useEffect(() => {
      getFetchData([
        { path: "data", field: "filterData" },
        { path: "status", field: "status" },
        { path: "products", field: "products" },
        { path: "users", field: "users" },
        { path: "status", field: "navData" }
      ])},
    [location.pathname]
  );
console.log(appState);
console.log(tableState);
 
  const title = appState?.data?.length > 0 ? 'Все заявки' : 'Нет заявок';

  // Изменение фильтра
  useEffect(() => {
    if (tableState.filterData) {
      let filteredData = doFilter("subNav", tableState.subNav, appState.data);

      if (appState.select) filteredData = doFilter("select", tableState.select, appState.data);
      
      setTableState((prev) => ({...prev, filterData: filteredData}));
    }
  }, [tableState.subNav, tableState.select, appState.data]);

  const sortData = useCallback(data =>  [...data].sort((current, next) => next.id - current.id), []); // Для сортировки не нужны зависимости

  // Отсортированные данные сохраняем в memo
  const sortedData = useMemo(
      () => sortData(tableState.filterData),
      [tableState.filterData, sortData]
  );
  

  const formattedData = useMemo(() => {
    return sortedData.map((data) =>
      formatDataInTable(data, appState.products, appState.status)
    );
  }, [sortedData, tableState.products, tableState.status]);
console.log(tableState);

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
