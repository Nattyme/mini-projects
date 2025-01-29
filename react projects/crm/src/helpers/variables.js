export const serverPath = 'http://localhost:8000/';

export const NAVIGATION_CONFIG = {
  subNavTop : {
    id: 'topStatusBar',
    className: 'btn-group',
    linkClassName: 'btn btn-light',
    linkDataRole: '',
    badge: false
  },
  
  subNavAside : {
    id: 'asideStatusNav',
    className: '',
    linkClassName: '',
    linkDataRole: 'left-status',
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

