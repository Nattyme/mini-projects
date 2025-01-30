import {STATUS_CONFIG} from './../../helpers/variables';
import { Link } from "react-router-dom";
import Badge from "../Badge";

const TableRow = ({formattedData}) => {
  return (
    <>
      {formattedData.map((task) => (
          <tr
            key={task.id}
            className="task-table__row task-table__row--link"
            data-status={task.status.value}
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
                type = {task.status.value || STATUS_CONFIG.NEW}
                value={task.status.title}/>
            </td>
            <td>
              <span className="button-edit">Редактировать</span>
            </td>
          </tr>
      ))}
    </>
  );
};

export default TableRow;
