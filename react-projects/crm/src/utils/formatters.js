const regEx = {
  digit :     /\D/g,
  formatRU : /^[87](\d{3})(\d{3})(\d{2})(\d{2})$/,
}

const formatName = (fullName) => {
  return fullName.split(' ').slice(0, 2).join(' ');   // если больше двух слов - убирает лишнее
}

const formatCamelWords = (dataString) => {
  dataString = dataString.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  dataString = dataString.join(' ');

  return dataString;
}

const formatPhone = (phoneNumber) => {
  let phone = phoneNumber.replace(regEx.digit, '');

  if (phone.length === 11 && (phone[0] === '8' || phone[0] === '7') ) {
    return phone.replace(regEx.formatRU, '+7 ($1) $2-$3-$4'); // формат RU
  } 

  return false;
}

const formatDateTime = (timestamp) => {
  const dateStamp = new Date(timestamp);
  let dateTime = dateStamp.toISOString();

  return dateTime = dateTime.slice(0, -5).replace('T', ' ');
}

const formatDate = (timestamp)=> {
  const formatter = new Intl.DateTimeFormat ( 'ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
  );

  return formatter.format( new Date(timestamp));
}

const formatProduct = (name, products) => {
  return products.find(product => product.value === name)?.title || '';
}

const formatStatus = (incomeStatus, statusTypes) => {
  const status = statusTypes.find(status => status.value === incomeStatus) || '';

  return {
    value : status.value,
    title : status.title
  }
}

const formatDataInTable = ( task, products, statusTypes) => {
  return {
    ...task,
    id : String(task.id),
    full_name : formatName(task.full_name),
    phone : formatPhone(task.phone),
    date : formatDate(task.timestamp),
    product : formatProduct(task.product, products),
    status : formatStatus(task.status, statusTypes)
  };
}

const formatTaskDateTime = (taskData, type = 'date') =>  {
  const dataCopy = {...taskData};  

  if (type === 'date') {
    dataCopy.date = formatDate( dataCopy.timestamp);
  }

  if (type === 'date-time') {
    dataCopy.date = formatDateTime( dataCopy.timestamp, 'date-time')
  }
  return dataCopy;
}

const formatTaskEdit = (taskData) => {
  let taskWithDate = formatTaskDateTime(taskData, 'date-time');
  let formattedPhone = formatPhone(taskWithDate.phone);

  if(!formattedPhone) return;
  
  taskWithDate.phone = formattedPhone;
  return taskWithDate;
}

export {formatName, formatPhone, formatCamelWords, formatDateTime, formatDate, formatProduct, formatDataInTable, formatTaskEdit}
