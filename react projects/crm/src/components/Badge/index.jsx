import { useMemo } from 'react';
import { BADGE_CONFIG } from './../../helpers/variables';
import './style.css';


/**
 * Компонент Badge (значок).
 * Используется для отображения метки с заданным типом и значением.
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.type - Тип значка, определяющий его стиль.
 * @param {string|number} props.value - Значение, отображаемое внутри значка.
 * @param {string|null} [props.id=null] - Идентификатор элемента (необязательный параметр).
 * @returns {JSX.Element|null} Возвращает элемент div с классом badgeType, если value задано, иначе null.
*/
const Badge = ({type, value, id = null}) => {
  const badgeType = useMemo( () => BADGE_CONFIG[type], [type]);

  if(!value || value.length === 0) return null;
  
  return (<div className={badgeType} id={id}>{value}</div>);
}
 
export default Badge;