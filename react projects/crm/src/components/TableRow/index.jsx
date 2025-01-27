import { useContext } from 'react';
import { AppContext } from './../../App/App';
import { Link } from 'react-router-dom';

const TableRow = () => {
  const {data} = useContext(AppContext);
  return(
    <>
      { data.map((task) => (
        <tr class="task-table__row task-table__row--link" data-status="new" data-display="">
          <td>{task.id}</td>
          <td>{task.timestamp}</td>
          <td>{task.product}</td>
          <td>
            <Link class="link-abs" title={`Перейти к редактированию заявки №${task.id}`} to={`/edit/${task.id}`}>
              {task.name}
            </Link>
            
            
          </td>
          <td>{task.email}</td>
          <td>{task.phone}</td>
          <td><div class="badge badge-pill badge-danger"></div>{task.status}</td>
          <td><a class="button-edit" href="edit.html"></a>Редактировать</td>
        </tr>
      ))}
    </>
  
  )
}
 
export default TableRow;