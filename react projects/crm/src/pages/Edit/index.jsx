import {Link, Links} from 'react-router-dom';
import Button from "../../components/Button";
import Card from "../../components/Card";
import Title from '../../components/Title';

const EditPage = ({products, statusData}) => {
  return (
    <div className="form-wrapper">
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="col">
            <Title text = "Работа с заявкой"/>
          </div>
          <div className="col text-right">
            <Link className="btn btn-link" to="/tasks"> Вернуться назад</Link>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form id="form" action="edit.html" method="POST">
              <Card products={products} statusData={statusData}/>

              <div className="row justify-content-between form__buttons">
                <div className="col text-right">
                  <Button
                    className="btn btn-primary"
                    text="Сохранить изменения"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
