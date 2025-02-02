import { useCallback, useContext, useMemo } from "react";
import { AppContext } from "./../../App/App";
import { formatDataInTable } from "./../../utils/formatters";
import {TABLE_HEADERS} from './../../helpers/variables';
import TableRow from '../TableRow';
import TableHead from "../TableHead";
import Loader from "../Loader";


/**
 * Компонент Table.
 * Отображает таблицу с отфильтрованными и отсортированными данными.
 * Данные сортируются по `id`, и отображаются в формате, соответствующем текущему состоянию продуктов и статусов.
 * Если данные не найдены, выводится сообщение о том, что нет заявок.
 * 
 * @component
 * 
 * @returns {JSX.Element} Разметка для таблицы.
*/
const Table = () => {
  const { appState } = useContext(AppContext);
  const sortData = useCallback((data) => {
    return  [...data].sort((current, next) => next.id - current.id);
  }, []); // Для сортировки не нужны зависимости

  // Отсортированные данные сохраняем в memo
  const sortedData = useMemo(() => sortData(appState.filterData), [appState.filterData, sortData]);
  const formattedData = useMemo(() => {
    return sortedData.map((data) => formatDataInTable(data, appState.products, appState.status))
  }, [sortedData, appState.products, appState.status]);

  if (formattedData.length === 0) return <h3 className="mt-1">Нет заявок по заданным параметрам</h3>;

  return (
    <table className="table fs-14">
      <TableHead headers={TABLE_HEADERS}/>
      <tbody id="tbody" className="table__body">
        {appState?.filterData && appState.filterData.length > 0 ? <TableRow formattedData={formattedData}></TableRow> : <Loader/>}
      </tbody>
    </table>
  );
}

export default Table;