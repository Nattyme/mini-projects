import Select from "../Select";
import StatusBar from "../StatusBar";
import Table from "../Table";

const Dashboard = ({statusData, tableHeaders}) => {
  return (
    <div className="main-wrapper">
			<div className="container-fluid">
        
				<div className="admin-heading-1">
          {statusData.length === 0 ? 'Нет заявок' : 'Все заявки'}
        </div>

        <div className="row mb-3 justify-content-start">
      
          <div className="col">
            { statusData.length > 0 && <StatusBar type={'top'} statusData={statusData}/>}
          </div>
        
          <div className="col">
            { statusData.length > 0 &&
                <Select
                  name="product"
                  className="custom-select"
                  id="productSelect"
                />
            }
          </div>
      
        </div>
				
        {statusData.length > 0 && <Table tableHeaders={tableHeaders}/>}
			</div>
		</div>
  );
}
 
export default Dashboard;