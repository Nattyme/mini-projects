import { useContext } from 'react';
import { AppContext } from '../../App/App';
import Select from "../Select";
import SubNav from "../SubNav";
import Table from "../Table";

const Dashboard = () => {
  const {products, data} = useContext(AppContext);
  
  return (
    <>
      <div className="row mb-3 justify-content-start">
        <div className="col">
          {data.length > 0 && (
            <SubNav type="top"/>
          )}
        </div>

        <div className="col">
          {products.length > 0 && data.length > 0 && (
            <Select
              name="product"
              className="custom-select"
              options={products}
              id="productSelect"
            />
          )}
        </div>
      </div>

      {data && data.length > 0 && <Table/>}
    </>

  );
};

export default Dashboard;
