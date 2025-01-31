import { useMemo } from 'react';
import { BADGE_CONFIG } from './../../helpers/variables';
import './style.css';

const Badge = ({type, value, id = null}) => {
  const badgeType = useMemo( () => BADGE_CONFIG[type], [type]);

  if(value === 0 || value.length === 0) return null;
  
  return (<div className={badgeType} id={id}>{value}</div>);
}
 
export default Badge;