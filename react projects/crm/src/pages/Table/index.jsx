import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";

const TablePage = ({products, statusData}) => { 
  const tableHeaders = ['ID', 'дата', 'продукт', 'имя', 'email', 'телефон', 'статус', ''];

  return (
    <>
      <SideBar statusData={statusData}/>
      <Dashboard tableHeaders = {tableHeaders} navData={statusData} selectData={products}/>
    </>
  );
}
 
export default TablePage;