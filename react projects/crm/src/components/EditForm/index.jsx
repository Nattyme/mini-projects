import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import EditFormBody from "../EditFormBody";
import EditFormHeader from "../EditFormHeader";
import { formActionPath } from "../../helpers/variables";
import { formatTaskEdit } from "../../utils/formatters";
import { removeTask } from "../../utils/taskUtils";
import { AppContext } from "../../App/App";
import Button from "../Button";

/**
 * Компонент EditForm (Карточка для редактирования задачи).
 * Предназначен для отображения и редактирования данных задачи с возможностью сохранить или удалить её.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {number} props.id - Идентификатор задачи для редактирования.
 * @returns {JSX.Element} Возвращает форму для редактирования задачи с кнопками "Сохранить изменения" и "Удалить".
 */
const EditForm = ({ id }) => {
  const navigate = useNavigate();
  const { appState, setAppState, sendNewFormData } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const currentTask = appState.data.find((task) => task.id === +id);

  // Заполнение карточки. знач-ми
  useEffect(() => {
    if (!currentTask) return;
    const editTask = formatTaskEdit(currentTask); // Приводим данные к формату для отображения на странице

    Object.keys(editTask).forEach((key) => {
      setValue(key, editTask[key]); // Задаём знач-я в поля формы
    });

    // Устанавливаем данные для формы, если их нет
    setAppState((prev) => ({
      ...prev,
      editTask: { ...editTask }, // Храним отформатированные данные
      initialFormData: { ...currentTask }, // Храним оригинальные данные
    }));
  }, [currentTask, setValue, setAppState]); // изм-е formdata обновляет setValue

  // Ф-ция обрабатывает отправку данных на сервер
  const onSubmit = (data) => {
    const { date, ...dataWithoutDate } = data;

    setAppState((prev) => ({
      ...prev,
      editForm: dataWithoutDate,
    }));

    sendNewFormData(
      formActionPath,
      "PUT",
      dataWithoutDate,
      setAppState,
      +dataWithoutDate.id
    );
    if (sendNewFormData) navigate("/tasks"); // Если ок - возврат к списку задач
  };

  return (
    <form
      id="form"
      action="edit.html"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="card mb-4">
        <EditFormHeader text="Данные о заявке" />
        {appState.editTask && (
          <EditFormBody
            editTask={appState.editTask}
            register={register}
            watch={watch}
            setValue={setValue}
          />
        )}
      </div>

      <div className="row justify-content-between form__buttons">
        <div className="col text-right">
          <Button className="btn btn-primary mr-2" text="Сохранить изменения" />
          <Button
            className="btn badge-danger"
            text="Удалить"
            type="button"
            onClick={() => {
              removeTask(id, formActionPath, setAppState, navigate);
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default EditForm;
