import Select from "../Select";
import StatusBar from "../StatusBar";
import Table from "../Table";

const Dashboard = ({statusData={statusData}}) => {
  return (
    <div className="main-wrapper">
			<div className="container-fluid">
				<div className="admin-heading-1">Все заявки</div>

				<form action="">

					<div className="row mb-3 justify-content-start">
				
						<div className="col">
							<StatusBar type={'top'} statusData={statusData}/>
						</div>
					
						<div className="col">
              <Select
                name="product"
                className="custom-select"
                id="productSelect"
              />
						</div>
				
					</div>
				</form>

        <Table/>
			</div>
		</div>
  );
}
 
export default Dashboard;