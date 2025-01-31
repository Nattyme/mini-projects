import Input from './../Input';
import Label from '../Label';
import FormGroup from './../FormGroup';
import Select from './../Select';
import { FORM_CONFIG } from "./../../helpers/variables";

const FormFieldsRender = ({register, watch, errors, setValue, appState}) => {
console.log(FORM_CONFIG);

  // Создаём FormGroup с input или select с нужными парам-ми
  const renderField = (field) => {
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
            <Label htmlFor = "product" text = "Продукт:"/>
            <Select 
              name={field.name}
              className={field.className}
              options={appState.products}
              defaultOption="Выберите продукт"
              id={field.id}
              value={watch(field.name)} // watch отслеживает текущее знач-е
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
  };

  // Возвращаем готовую разметку полей формы
  return (FORM_CONFIG.map(renderField));
}
 
export default FormFieldsRender;