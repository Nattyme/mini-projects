import './style.css';


/**
 * Компонент Input.
 * Используется для рендеринга поля ввода с поддержкой управления состоянием формы и валидации.
 * Предоставляет возможности для работы с изменениями значения и обработчиками событий.
 * 
 * @component
 * 
 * @param {Function} onChange - Функция-обработчик для изменения значения поля.
 * @param {string} type - Тип поля ввода, например, "text", "password", "email".
 * @param {string} name - Имя поля, используется для регистрации валидации.
 * @param {string} placeholder - Текст-подсказка, отображаемый в поле до ввода данных.
 * @param {string} id - Уникальный идентификатор поля.
 * @param {string} value - Значение поля.
 * @param {boolean} required - Указывает, обязательно ли поле для заполнения.
 * @param {object} register - Функция регистрации поля для валидации с использованием react-hook-form.
 * @param {string} [className="form-control"] - Классы для стилизации поля ввода.
 * @param {string} [autoComplete="on"] - Устанавливает значение атрибута autocomplete для поля.
 * 
 * @returns {JSX.Element} Разметка для поля ввода.
*/
const Input = ({onChange, type, name, placeholder, id, value, required, register, className="form-control", autoComplete="on"}) => {
	return (
		<input 
      onChange = {(e)=>{onChange(e)}}
			type={type}
			className={className} 
			name={name} 
			placeholder={placeholder}
			id={id} 
      value = {value}
			autoComplete={autoComplete} 
      {...register(name, {required: required ? "Поле обязательно для заполнения" : false})}
			required = {required}
		/>
	);
}

export default Input;