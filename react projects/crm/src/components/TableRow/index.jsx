import { useContext } from 'react';
import { AppContext } from './../../App/App';

const TableRow = () => {
  const {data} = useContext(AppContext);
  return(
    <>
      { data.map((task) => (
      <tr class="task-table__row task-table__row--link" data-status="new" data-display="">
        <td>id</td>
        <td>date</td>
        <td>product</td>
        <td><a class="link-abs" title="Перейти к редактированию заявки №6" href="edit.html?id=6">name</a></td>
        <td>email</td>
        <td>phone</td>
        <td><div class="badge badge-pill badge-danger"></div>status</td>
        <td><a class="button-edit" href="edit.html"></a>edit</td>
      </tr>
      ))}
    </>
  
  )
}
 
export default TableRow;