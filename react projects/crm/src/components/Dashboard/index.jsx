import { useContext } from 'react';
import { AppContext } from '../../App/App';
import {onChangedSelect} from './../../utils/filterFunctions';
import Select from "../Select";
import SubNav from "../SubNav";
import Table from "../Table";


/**
 * Компонент Dashboard.
 * Отображает навигацию, выпадающий список для выбора продукта и таблицу данных.
 * Предназначен для отображения общей информации о задачах и позволяет пользователю фильтровать данные по продуктам.
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.clickedSubNav - Функция, вызываемая при клике на элемент навигации.
 * @returns {JSX.Element} Возвращает разметку с навигацией, выпадающим списком и таблицей данных.
*/
const Dashboard = ({clickedSubNav}) => {
  const {appState, setAppState} = useContext(AppContext);

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
