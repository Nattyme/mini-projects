import { useContext } from 'react';
import { AppContext } from './../../App/App';
import { Link } from 'react-router-dom';

const TableRow = () => {
  const {appState} = useContext(AppContext);
  return(
    <>
      { appState.data.map((task) => (
        <tr class="task-table__row task-table__row--link" data-status="new" data-display="">
          <td>{task.id}</td>
          <td>{task.timestamp}</td>
          <td>{task.product}</td>
          <td>
            <Link class="link-abs" title={`Перейти к редактированию заявки №${task.id}`} to={`/edit/${task.id}`}>
              {task.full_name}
            </Link>
          </td>
          <td>{task.email}</td>
          <td>{task.phone}</td>
          <td><div class="badge badge-pill badge-danger"></div>{task.status}</td>
          <td><span class="button-edit">Редактировать</span></td>
        </tr>
      ))}
    </>
  
  )
}
 
export default TableRow;