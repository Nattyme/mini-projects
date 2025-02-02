/**
 * Компонент Select.
 * Рендерит выпадающий список с опциями, поддерживает связь с `react-hook-form` для валидации.
 * 
 * @component
 * 
 * @param {string} name - Имя поля, используется для регистрации валидации в react-hook-form.
 * @param {string} className - Классы для стилизации выпадающего списка.
 * @param {Array} options - Массив объектов, где каждый объект содержит значение и заголовок для опции.
 * @param {string} defaultOption - Текст для отображения в качестве дефолтной опции (по умолчанию, пустое поле).
 * @param {string} id - Уникальный идентификатор поля.
 * @param {string} value - Значение, которое должно быть выбрано в данный момент.
 * @param {Function} onChange - Функция-обработчик для изменения выбранного значения.
 * @param {Function} register - Функция для регистрации поля в форме с помощью react-hook-form.
 * @param {boolean} required - Если true, поле будет обязательным для заполнения.
 * 
 * @returns {JSX.Element} Разметка для выпадающего списка (select).
*/
const Select = ({name, className, options, defaultOption, id, value, onChange, register, required}) => {

	return (
		<select 
      id={id} 
      name={name} 
      className={className} 
      value={value}
      onChange = {onChange}
      {...(register ? register(name, {required}) : {})} // Связываем с react-hookform
    >
      <option value="">{defaultOption}</option>
      { options.map((option)=>{ 
          return (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          )
      }) }
		</select>
	);
}

export default Select;