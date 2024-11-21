import { buttons } from './buttons.js';

const taskLi = `
                  <li class="list-group-item">
                      {{taskText}}
                      ${buttons.save}
                      ${buttons.cancel}
                      ${buttons.delete}
                      ${buttons.edit}
                  </li>
                `;

export { taskLi };