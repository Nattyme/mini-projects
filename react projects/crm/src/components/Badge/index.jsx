import { useMemo } from 'react';
import { BADGE_CONFIG } from './../../helpers/variables';
import './style.css';

const Badge = ({type, value, id = null}) => {
  const badgeType = useMemo( () => BADGE_CONFIG[type], [type]);
  return (<div className={badgeType} id={id}>{value}</div>);
}
 
export default Badge;