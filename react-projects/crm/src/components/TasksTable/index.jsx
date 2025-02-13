import { TABLE_HEADERS } from "../../helpers/variables";
import Table from "../../UI/Table";
import TableHead from "../../UI/Table/TableHead";
import Loader from "../Loader";
import TasksTableRow from "./TasksTableRow";

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
const TasksTable = ({formattedData, tableState}) => {


  if (formattedData.length === 0)
<h3 className="mt-1">Нет заявок по заданным параметрам</h3>;

  return (
    <Table classNames={"fs-14"}>
      <TableHead headers={TABLE_HEADERS} />
      <tbody id="tbody" className="table__body">
        {tableState?.filterData && tableState.filterData.length > 0 ? (
          <TasksTableRow formattedData={formattedData} tableState={tableState}></TasksTableRow>
        ) : (
          <Loader />
        )}
      </tbody>
    </Table>
  );
};

export default TasksTable;
