import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../App/App";
import { formatDataInTable } from "../../utils/formatters";
import { TABLE_HEADERS } from "../../helpers/variables";
import Table from "../../UI/Table";
import TableHead from "../../UI/Table/TableHead";
import Loader from "../Loader";
import TasksTableRow from "./TasksTableRow";
import { doFilter } from "./../../utils/filterFunctions";

/**
 * Компонент TasksTable.
 * Отображает таблицу с отфильтрованными и отсортированными данными.
 * Данные сортируются по `id`, и отображаются в формате, соответствующем текущему состоянию продуктов и статусов.
 * Если данные не найдены, выводится сообщение о том, что нет заявок.
 *
 * @component
 *
 * @returns {JSX.Element} Разметка для таблицы.
 */
const TasksTable = () => {
  const { appState } = useContext(AppContext);
  const [tableState, setTableState] = useState({
    filterData: appState.data,
    subNav: 'all',
    select: 'all'
  }, [appState.data]);

  // Изменение фильтра 
  useEffect(() => {
    if (appState.data) {
      
      let filteredData = doFilter('subNav', tableState.subNav, appState.data);

      if ( appState.select) {
        filteredData = doFilter('select', tableState.select, appState.data);
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


  if (formattedData.length === 0)
<h3 className="mt-1">Нет заявок по заданным параметрам</h3>;

  return (
    <Table classNames={"fs-14"}>
      <TableHead headers={TABLE_HEADERS} />
      <tbody id="tbody" className="table__body">
        {tableState?.filterData && tableState.filterData.length > 0 ? (
          <TasksTableRow formattedData={formattedData}></TasksTableRow>
        ) : (
          <Loader />
        )}
      </tbody>
    </Table>
  );
};

export default TasksTable;
