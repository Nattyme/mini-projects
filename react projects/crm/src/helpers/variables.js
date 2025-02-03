/**
 * Путь к серверу, на котором размещен API.
 * @constant {string}
*/
export const serverPath = 'https://maddening-whispering-telephone.glitch.me/';

/**
 * Путь для отправки данных формы на сервер.
 * @constant {string}
*/
export const formActionPath = `${serverPath}data`;


/**
 * Конфигурация навигационных панелей.
 * @constant {Object}
 * @property {Object} subNavTop - Конфигурация верхней панели навигации.
 * @property {Object} subNavAside - Конфигурация боковой панели навигации.
*/
export const NAVIGATION_CONFIG = {
  subNavTop : {
    id: 'topStatusBar',
    className: 'sub-nav btn-group',
    liClassName: 'sub-nav__item btn btn-light',
    liDataRole: '',
    badge: false
  },
  
  subNavAside : {
    id: 'asideStatusNav',
    className: 'sub-nav',
    liClassName: 'sub-nav__item',
    liDataRole: 'left-status',
    badge: true
  }
}


/**
 * Статусы задач.
 * @constant {Object}
 * @property {string} NEW - Статус новой задачи.
 * @property {string} DOING - Статус задачи в процессе.
 * @property {string} DONE - Статус завершенной задачи.
 * @property {string} ALL - Все статусы.
 * @property {string} DEFAULT - Статус по умолчанию.
*/
export const STATUS_CONFIG = {
  NEW : 'new',
  DOING : 'inwork',
  DONE : 'completed',
  ALL : 'all',
  DEFAULT : 'default'
}


/**
 * Стили для отображения статусов в виде бейджей.
 * @constant {Object}
 * @property {string} danger - Стиль для статуса "new".
 * @property {string} neutral - Стиль для статуса "doing".
 * @property {string} success - Стиль для статуса "done".
 * @property {string} default - Стиль для статуса по умолчанию.
*/
export const STATUS_STYLES = {
  danger: 'badge badge-pill badge-danger',
  neutral: 'badge badge-pill badge-warning',
  success: 'badge badge-pill badge-success',
  default: 'badge'
}


/**
 * Конфигурация для отображения бейджей в зависимости от статуса.
 * @constant {Object}
 * @property {string} STATUS_CONFIG.NEW - Стиль для статуса NEW.
 * @property {string} STATUS_CONFIG.DOING - Стиль для статуса DOING.
 * @property {string} STATUS_CONFIG.DONE - Стиль для статуса DONE.
 * @property {string} STATUS_CONFIG.DEFAULT - Стиль для статуса DEFAULT.
*/
export const BADGE_CONFIG = {
  [STATUS_CONFIG.NEW] : STATUS_STYLES.danger,
  [STATUS_CONFIG.DOING] : STATUS_STYLES.neutral,
  [STATUS_CONFIG.DONE] : STATUS_STYLES.success,
  [STATUS_CONFIG.DEFAULT] : STATUS_STYLES.default
}


/**
 * Конфигурация для полей формы.
 * @constant {Array<Object>}
 * @property {string} element - Тип элемента формы (например, 'input', 'select').
 * @property {string} type - Тип поля для 'input' (например, 'text', 'email').
 * @property {string} name - Имя поля, которое будет отправлено на сервер.
 * @property {string} placeholder - Текст подсказки для поля.
 * @property {string} id - Уникальный идентификатор поля.
 * @property {boolean} required - Флаг обязательности поля для отправки.
 * @property {string} className - Класс CSS для поля (только для 'select').
 */
export const FORM_CONFIG = [
  {
    element: 'input',
    type: 'text',
    name: 'full_name',
    placeholder : 'Имя и Фамилия',
    id : 'full_name',
    required : true
  },
  {
    element: 'input',
    type: 'text',
    name: 'phone',
    placeholder : 'Телефон',
    id : 'phone',
    required : true
  },
  {
    element: 'input',
    type: 'text',
    name: 'email',
    placeholder : 'Email',
    id : 'email',
    required : true
  },
  {
    element: 'select',
    className: 'form-control',
    name: 'product',
    id : 'product',
  }
];

export const TABLE_HEADERS = ['ID', 'дата', 'продукт', 'имя', 'email', 'телефон', 'статус', ''];



