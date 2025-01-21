import {formatName, formatPhone} from './../utils/formatters';

const prepareDisplayData = (task) => {
  return {
    ...task,
    phone : formatPhone(task.phone),
    full_name : formatName(task.full_name)
  }
}

export default prepareDisplayData;