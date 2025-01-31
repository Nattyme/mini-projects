import { useContext, useMemo } from "react";
import { AppContext } from "./../../App/App";
import { formatDataInTable } from "./../../utils/formatters";
import {TABLE_HEADERS} from './../../helpers/variables';
import TableRow from '../TableRow';
import TableHead from "../TableHead";

const Table = () => {
  const { appState } = useContext(AppContext);

  const sortedData = useMemo(() => [...appState.filterData].sort((current, next) => next.id - current.id), [appState.filterData]);

  const formattedData = useMemo(() => (
    sortedData.map(data => formatDataInTable(data, appState.products,appState.status))), 
    [sortedData, appState.products, appState.status]
  );


  if (formattedData.length === 0) return <h3 className="mt-1">Нет заявок по заданным параметрам</h3>;

  return (
    <table className="table fs-14">
      <TableHead headers={TABLE_HEADERS}/>
      <tbody id="tbody" className="table__body">
        <TableRow formattedData={formattedData}></TableRow>
      </tbody>
    </table>
  );
}

export default Table;