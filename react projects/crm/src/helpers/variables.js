export const serverPath = 'http://localhost:8000/';
export const formActionPath = `${serverPath}data`;

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

export const STATUS_CONFIG = {
  NEW : 'new',
  DOING : 'inwork',
  DONE : 'completed',
  ALL : 'all',
  DEFAULT : 'default'
}

export const STATUS_STYLES = {
  danger: 'badge badge-pill badge-danger',
  neutral: 'badge badge-pill badge-warning',
  success: 'badge badge-pill badge-success',
  default: 'badge'
}

export const BADGE_CONFIG = {
  [STATUS_CONFIG.NEW] : STATUS_STYLES.danger,
  [STATUS_CONFIG.DOING] : STATUS_STYLES.neutral,
  [STATUS_CONFIG.DONE] : STATUS_STYLES.success,
  [STATUS_CONFIG.DEFAULT] : STATUS_STYLES.default
}


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



