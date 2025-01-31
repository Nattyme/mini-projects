import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CardBody from "../CardBody";
import CardHeader from "../CardHeader";
import {formActionPath, tasksAllPath} from './../../helpers/variables';
import {formatTaskEdit} from './../../utils/formatters'
import { AppContext } from "../../App/App";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Card = ({id}) => {
  const navigate = useNavigate();
  const {appState, setAppState, sendNewFormData} = useContext(AppContext);
  const {register, handleSubmit, setValue, watch, formState: {errors} } = useForm();
  const currentTask = appState.data.find((task) => task.id === +id);
  
  // Заполнение карточки. знач-ми
  useEffect(()=>{
    if(!currentTask) return;
    const editTask = formatTaskEdit(currentTask);  // Приводим данные к формату для отображения на странице
  


    Object.keys(editTask).forEach((key) => {
      setValue(key, editTask[key]); // Задаём знач-я в поля формы
    });

    // Устанавливаем данные для формы, если их нет
    setAppState((prev) => ({
      ...prev,
      editTask: { ...editTask },  // Храним отформатированные данные
      initialFormData: { ...currentTask }  // Храним оригинальные данные
    }));
    

  }, [currentTask, setValue, setAppState]); // изм-е formdata обновляет setValue

  // Ф-ция обрабатывает отправку данных на сервер
  const onSubmit = (data) => {
    const {date, ...dataWithoutDate} = data;
    
    setAppState((prev)=>({
        ...prev,
        editForm: dataWithoutDate
    }));

    sendNewFormData(formActionPath, 'PUT',  dataWithoutDate, setAppState, +dataWithoutDate.id);

    if(sendNewFormData) {
      navigate('/tasks')
    }
  }
 
     
  return (
    <form id="form" action="edit.html" method="POST"  onSubmit={handleSubmit(onSubmit)} >
      <div className="card mb-4">
        <CardHeader text="Данные о заявке"/>
        {appState.editTask && <CardBody editTask={appState.editTask} register={register} watch={watch} setValue={setValue}/>}
      </div>
               
      <div className="row justify-content-between form__buttons">
        <div className="col text-right">
          <Button
            className="btn btn-primary"
            text="Сохранить изменения"
          />
     
        </div>
      </div>
    </form>
  );
}
 
export default Card;