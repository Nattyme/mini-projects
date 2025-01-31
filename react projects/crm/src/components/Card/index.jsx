import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CardBody from "../CardBody";
import CardHeader from "../CardHeader";
import {formatTaskEdit} from './../../utils/formatters'
import { AppContext } from "../../App/App";

const Card = ({id}) => {
  const {appState, setAppState} = useContext(AppContext);
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
    console.log(data);
    
  }

     
  return (
    <div className="card mb-4">
      <CardHeader text="Данные о заявке"/>
      {appState.editTask && <CardBody editTask={appState.editTask} register={register}/>}
    </div>
  );
}
 
export default Card;