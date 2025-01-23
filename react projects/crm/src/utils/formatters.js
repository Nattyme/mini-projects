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

export {formatName, formatPhone, formatCamelWords}
