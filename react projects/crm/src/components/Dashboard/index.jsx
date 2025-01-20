import Select from "../Select";
import SubNav from "../SubNav";
import Table from "../Table";
import Title from './../Title'

const Dashboard = ({ selectData, navData, tableHeaders}) => {
  return (
    <div className="main-wrapper">
      <div className="container-fluid">
        {navData.length === 0 ? <Title text = "Нет заявок"/>: <Title text = "Все заявки"/>}
        
        <div className="row mb-3 justify-content-start">
          <div className="col">
            {navData.length > 0 && (
              <SubNav type="top" data={navData} />
            )}
          </div>

          <div className="col">
            {navData.length > 0 && (
              <Select
                name="product"
                className="custom-select"
                options={selectData}
                id="productSelect"
              />
            )}
          </div>
        </div>

        {navData.length > 0 && <Table tableHeaders={tableHeaders} />}
      </div>
    </div>
  );
};

export default Dashboard;
