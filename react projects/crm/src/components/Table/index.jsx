import { useContext, useMemo } from "react";
import { AppContext } from "./../../App/App";
import { formatDataInTable } from "./../../utils/formatters";
import TableRow from '../TableRow';

const Table = () => {
  const tableHeaders = ['ID', 'дата', 'продукт', 'имя', 'email', 'телефон', 'статус', ''];
  const { appState } = useContext(AppContext);
  let sortedData = useMemo(() => [...appState.filterData].sort((current, next) => next.id - current.id), [appState.filterData]);

  const formattedData = useMemo(() => (
    sortedData.map((data) => {
      return formatDataInTable(
          data,
          appState.products,
          appState.status
      )
    })
  ), [sortedData, appState.products, appState.status]);

  if (formattedData.length === 0) return <h3 className="mt-1">Нет заявок по заданным параметрам</h3>;

  return (
    <table className="table fs-14">
      <thead>
        <tr>
          {tableHeaders.map( (header) => {
            return(<th key={header}>{header}</th>);
          })}
        </tr>
      </thead>
      <tbody id="tbody" className="table__body">
        {<TableRow formattedData={formattedData}></TableRow>}
      </tbody>
    </table>
  );
}

export default Table;