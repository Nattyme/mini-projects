import { useContext } from 'react';
import { AppContext } from '../../App/App';
import Select from "../Select";
import SubNav from "../SubNav";
import Table from "../Table";

const Dashboard = ({clickedSubNav}) => {
  const {appState, setAppState, onChangedSelect} = useContext(AppContext);

  return (
    <>
      <div className="row mb-3 justify-content-start">
        <div className="col">
          {appState.data.length > 0 && (
            <SubNav type="top" clickedSubNav={clickedSubNav}/>
          )}
        </div>

        <div className="col">
          {appState.products.length > 0 && appState.data.length > 0 && (
            <Select
              name="product"
              className="custom-select"
              options={appState.products}
              id="productSelect"
              onChange={(e) => {onChangedSelect(e, setAppState)}}
              defaultOption="Все продукты"
            />
          )}
        </div>
      </div>

      {appState?.data && appState.data.length > 0 && <Table/>}
    </>

  );
};

export default Dashboard;
