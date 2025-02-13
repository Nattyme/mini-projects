import { useForm } from "react-hook-form";

/**
 * Компонент формы для отправки данных через форму.
 *
 * Использует хук `useForm` из `react-hook-form` для работы с состоянием формы.
 * Загружает тестовые значения в поля формы и отправляет данные при отправке формы.
 */
const Form = ({ children, onSubmit }) => {
  const {handleSubmit} = useForm();

  return (
    <form id="form" method="POST" onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  );
};

export default Form;
