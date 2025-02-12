import { STATUS_CONFIG } from "../../helpers/variables";
import { Link } from "react-router-dom";
import Badge from "../Badge";
import TableRow from "../../UI/Table/TableRow";

const TasksTableRow = ({ formattedData }) => {
  const uniqueTasks = Array.from(
    new Map(formattedData.map((task) => [task.id, task])).values()
  );

  return (
    <>
      {uniqueTasks.map((task) => (
        <TableRow
          key={task.id}
          classNames="task-table__row task-table__row--link"
          dataStatus={task.status.value}
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
              type={task.status.value || STATUS_CONFIG.NEW}
              value={task.status.title}
            />
          </td>
          <td>
            <span className="button-edit">Редактировать</span>
          </td>
        </TableRow>
      ))}
    </>
  );
};

export default TasksTableRow;
