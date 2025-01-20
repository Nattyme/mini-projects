import Input from "../../components/Input";
import Select from "../../components/Select";

const Card = ({products, statusData}) => {
  return (
    <div className="card mb-4">
      <div className="card-header">Данные о заявке</div>
      <div className="card-body">
        <div className="row mb-3">
            <div className="col-md-2">
              <strong>ID:</strong>
            </div>
            <div className="col">
              Заявка №<span id="number">1</span>
            </div>
            <input name="id" type="hidden" id="id" />
        </div>

        <div className="row mb-3">
          <div className="col-md-2">
            <strong>Дата создания:</strong>
          </div>
          <div className="col" id="date">
            2020-04-20 13:52:13
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-2">
            <strong>Продукт:</strong>
          </div>
          <div className="col">
            <Select
              name="product"
              className="custom-select"
              options={products}
              id="product"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-2">
            <strong>Имя:</strong>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              value="Петр Сергеевич"
              id="full_name"
              name="full_name"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-2">
            <strong>Email:</strong>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              value="info@inbox.ru"
              id="email"
              name="email"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-2">
            <strong>Телефон:</strong>
          </div>
          <div className="col">
            <Input
              type="text"
              name="phone"
              placeholder="phone"
              id="phone"
              className="form-control"
              value="+7 (903) 555-77-55"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-2">
            <strong>Статус заявки:</strong>
          </div>
          <div className="col">
            <Select
              name="status"
              className="custom-select"
              options={statusData}
              id="status"
              value="Выберите статус"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Card;