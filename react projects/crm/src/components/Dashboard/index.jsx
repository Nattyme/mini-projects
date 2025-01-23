import { useContext } from 'react';
import { AppContext } from '../../App/App';
import Select from "../Select";
import SubNav from "../SubNav";
import Table from "../Table";

const Dashboard = ({ selectData, navData, tableHeaders}) => {
  const {products, statusData} = useContext(AppContext);
  return (
    <>
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
    </>

  );
};

export default Dashboard;
