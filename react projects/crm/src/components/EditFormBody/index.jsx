import { useContext } from "react";
import Input from "../../UI/Input";
import Select from "../../UI/Select";
import EditFormRow from "../EditFormRow";
import { AppContext } from "../../App/App";

/**
 * Компонент CardBody — тело карточки редактирования заявки.
 * Отображает форму с полями для ввода данных, используя react-hook-form.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.editTask - Объект редактируемой заявки.
 * @param {Function} props.register - Функция регистрации полей формы (из react-hook-form).
 * @param {Function} props.watch - Функция для отслеживания изменений в полях формы.
 * @param {Function} props.setValue - Функция для обновления значений полей формы.
 *
 * @returns {JSX.Element} Элемент <div> с полями ввода, обернутыми в <CardRow>.
 */
const EditFormBody = ({ editTask, register, watch, setValue }) => {
  const { appState } = useContext(AppContext);

  const formFields = [
    {
      label: "ID",
      content: (
        <>
          Заявка №<span id="number">{editTask.id}</span>
          <Input
            type="hidden"
            name="id"
            placeholder={`${editTask.id}`}
            id="id"
            value=""
            required={false}
            register={register}
          />
        </>
      ),
    },
    {
      label: "Дата создания:",
      content: editTask.date,
    },
    {
      label: "Продукт:",
      content: (
        <Select
          name="product"
          className="custom-select"
          value={watch(editTask.product)}
          options={appState.products}
          id="product"
          register={register}
          defaultOption="Выберите продукт"
          required={true}
          onChange={(e) => setValue(e.target.name, e.target.value)}
        />
      ),
    },
    {
      label: "Имя:",
      content: (
        <Input
          type="text"
          name="full_name"
          placeholder="Введите имя"
          id="full_name"
          value={watch(editTask.full_name)}
          className="form-control"
          onChange={(e) => setValue(e.target.name, e.target.value)}
          required={true}
          register={register}
        />
      ),
    },
    {
      label: "Email:",
      content: (
        <Input
          type="text"
          name="email"
          placeholder="Введите email"
          id="email"
          value={watch(editTask.email)}
          className="form-control"
          required={true}
          register={register}
        />
      ),
    },
    {
      label: "Телефон:",
      content: (
        <Input
          type="text"
          name="phone"
          placeholder="phone"
          id="phone"
          className="form-control"
          value={watch(editTask.phone)}
          required={true}
          register={register}
        />
      ),
    },
    {
      label: "Статус заявки:",
      content: (
        <Select
          name="status"
          className="custom-select"
          options={appState.navData.filter((status) => status.value !== "all")}
          placeholder="Выберите статус"
          id="status"
          value={watch("status")}
          register={register}
          defaultOption="Выберите статус"
          required={true}
          onChange={(e) => setValue(e.target.name, e.target.value)}
        />
      ),
    },
  ];

  return (
    <div className="card-body">
      {appState.products &&
        appState.navData &&
        formFields.map((field) => {
          return (
            <EditFormRow key={field.label} label={field.label}>
              {field.content}
            </EditFormRow>
          );
        })}
    </div>
  );
};

export default EditFormBody;
