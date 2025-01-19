import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";

const TablePage = () => {
  const statusData = [
    {
      data : 'all',
      text : 'Все'
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
  ]
  return (
    <>
		  <SideBar statusData={statusData}/>
      <Dashboard statusData={statusData}/>
    </>
  );
}
 
export default TablePage;