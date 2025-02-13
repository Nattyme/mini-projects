import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { formActionPath } from "./../../helpers/variables";
import { AppContext } from "../../App/App";
import { createTask } from "./../../utils/taskUtils";
import Label from "../../UI/Label";
import Button from "../../UI/Button";
import FormGroup from "../../UI/Form/FormGroup";
import FormFieldsRender from "../FormFieldsRender/FormFieldsRender";
import Form from "../../UI/Form";

/**
 * Компонент формы для отправки данных через форму.
 *
 * Использует хук `useForm` из `react-hook-form` для работы с состоянием формы.
 * Загружает тестовые значения в поля формы и отправляет данные при отправке формы.
 */
const RequestForm = ({ formState }) => {
  const { appState, setAppState } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Заполнение формы тест. знач-ми
  useEffect(() => {
    if (!formState.formData) return;
    console.log(formState.formData);

    Object.keys(formState.formData).forEach((key) => {
      setValue(key, formState.formData[key]); // Задаём тестовые значения в поля формы
    });
  }, [formState.formData, setValue]); // изм-е formdata обновляет setValue

  // Обновляем состояние при отправке данных
  const onSubmit = (data) => {
    setAppState((prev) => ({
      ...prev,
      formData: data,
    }));

    createTask(formActionPath, data, setAppState);
  };

  return (
    <Form formState={formState} onSubmit={onSubmit}>
      <Label htmlFor="full_name" text="Ваши данные:" />

      <FormFieldsRender
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
        appState={appState}
      />

      <FormGroup id="noteWrapper" key="noteWrapper">
        <Button
          text="Оформить заявку"
          className="btn btn-lg btn-primary btn-block"
        />
      </FormGroup>
    </Form>
  );
};

export default RequestForm;
