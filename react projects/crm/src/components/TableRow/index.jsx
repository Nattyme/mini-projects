import {STATUS_CONFIG} from './../../helpers/variables';
import { Link } from "react-router-dom";
import Badge from "../Badge";



/**
 * Компонент TableRow.
 * Отображает строку таблицы для каждой заявки.
 * Принимает отформатированные данные и отображает их в таблице.
 * 
 * @component
 * 
 * @param {Object} props
 * @param {Array} props.formattedData - Массив объектов, содержащих отформатированные данные для отображения в строках таблицы.
 * 
 * @returns {JSX.Element} Разметка для строк таблицы, отображающих данные заявок.
*/
const TableRow = ({formattedData}) => {
  const uniqueTasks = Array.from(new Map(formattedData.map((task) => [task.id, task])).values());
  return (
    <>
      {uniqueTasks.map((task) => (
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
