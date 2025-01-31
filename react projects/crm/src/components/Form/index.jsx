import { useContext, useEffect } from 'react';
import {useForm} from 'react-hook-form';

import { formActionPath } from "./../../helpers/variables";
import { AppContext } from '../../App/App';
import Label from '../Label';
import Button from '../Button';
import FormGroup from './../FormGroup';
import FormFieldsRender from '../FormFieldsRender/FormFieldsRender';


/**
 * Компонент формы для отправки данных через форму.
 * 
 * Использует хук `useForm` из `react-hook-form` для работы с состоянием формы.
 * Загружает тестовые значения в поля формы и отправляет данные при отправке формы.
*/
const Form = () => {
  const {appState, setAppState, sendNewFormData} = useContext(AppContext);
  const {register, handleSubmit, setValue, watch, formState: {errors} } = useForm();

  // Заполнение формы тест. знач-ми
  useEffect(()=>{
    if(!appState.formData) return;

    Object.keys(appState.formData).forEach((key) => {
      setValue(key, appState.formData[key]); // Задаём тестовые значения в поля формы
    })
  }, [appState.formData, setValue]); // изм-е formdata обновляет setValue
  
  // Обновляем состояние при отправке данных 
  const onSubmit = (data) => {
    setAppState((prev)=>({
      ...prev,
      formData: data
    }));
    sendNewFormData(formActionPath, data, setAppState);
  }
 
 
  return (
    <form id="form" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor = 'full_name' text = 'Ваши данные:'/>
     
      <FormFieldsRender register={register} watch={watch} errors={errors} setValue={setValue} appState={appState}/>
    
      <FormGroup id='noteWrapper' key="noteWrapper">
        <Button text='Оформить заявку' className='btn btn-lg btn-primary btn-block'/>
      </FormGroup>

    </form>
  );
}

export default Form;