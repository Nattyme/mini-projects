import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./../../App/App";
import { formatDataInTable } from "./../../utils/formatters";

const TableRow = ({ filterData }) => {
  const { appState } = useContext(AppContext);
  let sortedData = filterData.sort(
    (currentObj, nextObj) => nextObj.id - currentObj.id
  );
  useEffect(() => {
      sortedData = [...filterData].sort(
        (currentObj, nextObj) => nextObj.id - currentObj.id
      );
    },
    [filterData]
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
            class="task-table__row task-table__row--link"
            data-status="new"
            data-display=""
          >
            <td>{task.id}</td>
            <td>{task.date}</td>
            <td>{task.product}</td>
            <td>
              <Link
                class="link-abs"
                title={`Перейти к редактированию заявки №${task.id}`}
                to={`/edit/${task.id}`}
              >
                {task.full_name}
              </Link>
            </td>
            <td>{task.email}</td>
            <td>{task.phone}</td>
            <td>
              <div class="badge badge-pill badge-danger"></div>
              {task.status}
            </td>
            <td>
              <span class="button-edit">Редактировать</span>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default TableRow;
