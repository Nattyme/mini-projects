import { buttons, getButtons } from './buttons.js';



const taskLi = `
                  <li class="list-group-item">
                      {{taskText}}
                      ${getButtons(buttons, ['delete', 'edit'])}
                  </li>
                `;

export { taskLi };