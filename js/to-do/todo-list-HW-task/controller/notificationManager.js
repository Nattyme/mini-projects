import { MESSAGES }  from '../model/notes/notes.js';
import { TEMPLATES }  from '../view/templates/templates.js';

const displayMessage = function () {
  console.log('display message');
  const messageData = MESSAGES;
  const messageHtml = TEMPLATES;
  console.log(messageHtml);
  console.log(messageData);
  
}

export { displayMessage };