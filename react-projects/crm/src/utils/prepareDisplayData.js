import {formatName, formatPhone} from './../utils/formatters';

export const prepareDisplayData = () => {

  const prepareDisplayFormData = (task) => {
    return {
      ...task,
      phone : formatPhone(task.phone),
      full_name : formatName(task.full_name)
    }
  }
  
  return {prepareDisplayFormData}
}

