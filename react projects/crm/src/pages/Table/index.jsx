import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";

const TablePage = () => {
  const statusData = [
    {
      data : 'all',
      text : 'Все',
    },
    {
      data : 'new',
      text : 'Новые'
    },
    {
      data : 'inwork',
      text : 'В работе'
    },
    {
      data : 'completed',
      text : 'Завершенные'
    }
  ];

  const tableHeaders = ['ID', 'дата', 'продукт', 'имя', 'email', 'телефон', 'статус', ''];

  
  return (
    <>
      <SideBar statusData={statusData}/>
      <Dashboard tableHeaders = {tableHeaders} statusData={statusData}/>
    </>
  );
}
 
export default TablePage;