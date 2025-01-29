import { useContext } from "react";
import {NEW, WARN, DOING, NEUTRAL, DONE, FINISH} from './../../helpers/variables';
import { Link } from "react-router-dom";
import { AppContext } from "./../../App/App";
import { formatDataInTable } from "./../../utils/formatters";
import Badge from "../Badge";

const TableRow = ({ filterData }) => {
  const { appState } = useContext(AppContext);
  const badgeConfig = {
    [NEW] : WARN,
    [DOING] : NEUTRAL,
    [DONE] : FINISH
  }

  let sortedData = [...filterData].sort(
    (currentObj, nextObj) => nextObj.id - currentObj.id
  );

  return (
    <>
      {sortedData.map((data) => {
        const task = formatDataInTable(
          data,
          appState.products,
          appState.status
        );

        return (
          <tr
            key={task.id}
            className="task-table__row task-table__row--link"
            data-status={data.status}
            data-display=""
          >
            <td>{task.id}</td>
            <td>{task.date}</td>
            <td>{task.product}</td>
            <td>
              <Link
                className="link-abs"
                title={`Перейти к редактированию заявки №${task.id}`}
                to={`/edit/${task.id}`}
              >
                {task.full_name}
              </Link>
            </td>
            <td>{task.email}</td>
            <td>{task.phone}</td>
            <td>
              <Badge 
                type = {badgeConfig[data.status] || badgeConfig[NEW]}
                value={task.status}/>
            </td>
            <td>
              <span className="button-edit">Редактировать</span>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default TableRow;
