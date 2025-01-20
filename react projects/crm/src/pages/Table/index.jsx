import Dashboard from "../../components/Dashboard";
import SideBar from "../../components/Sidebar";
import Title from './../../components/Title';

const TablePage = ({products, statusData}) => { 
  const tableHeaders = ['ID', 'дата', 'продукт', 'имя', 'email', 'телефон', 'статус', ''];
  const title = statusData.length === 0 ? "Нет заявок" : "Все заявки";

  return (
  
    <>
      <SideBar statusData={statusData}/>
      <div className="main-wrapper">
        <div className="container-fluid">
          <Title title={title}/>
          <Dashboard tableHeaders={tableHeaders} navData={statusData} selectData={products}/>
        </div>
      </div>    
    </>
  );
}
 
export default TablePage;