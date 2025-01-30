import { useContext, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { formActionPath } from "./../../helpers/variables";
import { AppContext } from '../../App/App';
import Label from '../Label';
import Input from './../Input';
import FormGroup from './../FormGroup';
import Select from '../Select';
import Button from '../Button';

const formFields = [
  {
    element: 'input',
    type: 'text',
    name: 'full_name',
    placeholder : 'Имя и Фамилия',
    id : 'full_name',
    required : true
  },
  {
    element: 'input',
    type: 'text',
    name: 'phone',
    placeholder : 'Телефон',
    id : 'phone',
    required : true
  },
  {
    element: 'input',
    type: 'text',
    name: 'email',
    placeholder : 'Email',
    id : 'email',
    required : true
  },
  {
    element: 'select',
    className: 'form-control',
    name: 'product',
    id : 'product',
  }
];


const Form = () => {
  const {appState, setAppState, sendNewFormData, onChangedSelect, updateFieldValue} = useContext(AppContext);
  // const {appState, setAppState, clearFieldOnClick, btnClicked, onChangedSelect} = useContext(AppContext);
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
    console.log(data);
    
    setAppState((prev)=>({
      ...prev,
      formData: data
    }));
    sendNewFormData(formActionPath, data, setAppState);
  }
 
  const formContent = formFields.map((field) => {
    switch (field.element) {
      case 'input' :
        return (
          <FormGroup key={field.id}>
            <Input 
              type = {field.type}
              name = {field.name}
              placeholder = {field.placeholder}
              id = {field.id}
              onChange = {(e)=> setValue(field.name, e.target.value)}
              register = {register}
              required={field.required}
            />
            {errors[field.name] && <p className="error">{errors[field.name?.message]}</p>}
          </FormGroup>
        );
      case 'select' :
        return (
          <FormGroup key={field.id}>
            <Label htmlFor = 'product' text = 'Продукт:'/>
            <Select 
              name={field.name}
              className={field.className}
              options={appState.products}
              defaultOption="Выберите продукт"
              id={field.id}
              value={watch(field.name)}
              onChange={(e) => {
                setValue(field.name, e.target.value); // Обнов-е знач. в react-hook-form;
              }}
              register={register} // Передача register react-hook-form
              required={true}
            />
            {errors[field.name] && <p className="error">{errors[field.name]?.message}</p>} 
          </FormGroup>
        );

      default :
        return null;
    }
  });

  return (
    <form 
      id="form" 
      method="POST" 
      onSubmit={handleSubmit(onSubmit)}
      // onClick={(e)=>{clearFieldOnClick(e, setAppState)}}
    >

      <Label htmlFor = 'full_name' text = 'Ваши данные:'/>
      {formContent}
      <FormGroup id='noteWrapper' key="noteWrapper">
        <Button 
          text='Оформить заявку' 
          className='btn btn-lg btn-primary btn-block' 
          dataBtn ='submit'
        />
      </FormGroup>

    </form>
  );
}

export default Form;