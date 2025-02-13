import Input from "../../UI/Input";
import Label from "../../UI/Label";
import FormGroup from "../../UI/Form/FormGroup";
import Select from "../../UI/Select";
import { FORM_CONFIG } from "./../../helpers/variables";

/**
 * Компонент для рендеринга различных полей формы на основе конфигурации.
 * Поддерживает поля типа `input` и `select`.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.register - Функция из `react-hook-form`, используемая для регистрации полей формы.
 * @param {Function} props.watch - Функция из `react-hook-form` для отслеживания значения полей.
 * @param {Object} props.errors - Ошибки, связанные с полями формы, предоставленные `react-hook-form`.
 * @param {Function} props.setValue - Функция из `react-hook-form`, используемая для обновления значений полей.
 * @param {Object} props.appState - Состояние приложения, содержащее данные для полей формы (например, список продуктов).
 *
 * @returns {JSX.Element} Разметка для рендеринга полей формы на основе конфигурации.
 */
const FormFieldsRender = ({ register, watch, errors, setValue, appState }) => {
  /**
   * Функция для рендеринга поля формы в зависимости от типа элемента.
   *
   * @param {Object} field - Объект конфигурации для поля.
   * @param {string} field.element - Тип элемента, который нужно отрисовать (например, 'input', 'select').
   * @param {string} field.type - Тип поля (например, 'text', 'number', 'email' для input).
   * @param {string} field.name - Имя поля.
   * @param {string} field.placeholder - Текст подсказки для поля (только для input).
   * @param {boolean} field.required - Флаг обязательности поля.
   * @param {string} field.id - Идентификатор поля (для уникальности в DOM).
   * @param {string} field.className - Классы для стилизации поля (для select).
   *
   * @returns {JSX.Element|null} Разметка поля формы или null, если тип поля не поддерживается.
   */
  const renderField = (field) => {
    switch (field.element) {
      case "input":
        return (
          <FormGroup key={field.id}>
            <Input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              id={field.id}
              onChange={(e) => setValue(field.name, e.target.value)}
              register={register}
              required={field.required}
            />
            {errors[field.name] && (
              <p className="error">{errors[field.name?.message]}</p>
            )}
          </FormGroup>
        );
      case "select":
        return (
          <FormGroup key={field.id}>
            <Label htmlFor="product" text="Продукт:" />
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
            {errors[field.name] && (
              <p className="error">{errors[field.name]?.message}</p>
            )}
          </FormGroup>
        );

      default:
        return null;
    }
  };

  // Возвращаем готовую разметку полей формы
  return FORM_CONFIG.map(renderField);
};

export default FormFieldsRender;
