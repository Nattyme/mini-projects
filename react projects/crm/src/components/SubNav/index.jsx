import { useContext } from 'react';
import { NAVIGATION_CONFIG, STATUS_CONFIG  } from './../../helpers/variables';
import { AppContext } from './../../App/App';
import Badge from '../Badge';
import './style.css';


/**
 * Компонент SubNav — боковая или верхняя навигация.
 * Отображает список навигационных пунктов с возможностью выбора активного пункта.
 * 
 * @param {Object} props - Свойства компонента.
 * @param {string} props.type - Тип навигации: 'top' (верхняя) или 'aside' (боковая).
 * @param {Function} props.clickedSubNav - Функция обработки клика по пункту навигации.
 * 
 * @returns {JSX.Element} Элемент списка <ul> с пунктами навигации <li>.
*/
const SubNav = ({type, clickedSubNav}) => {
  const {appState, setAppState} = useContext(AppContext); 
  const {subNavTop, subNavAside } = NAVIGATION_CONFIG;
  const navType = type === 'top' ? subNavTop : subNavAside;
  const countedField = appState.data.filter((task) => task.status === STATUS_CONFIG.NEW).length;
  
  return (
    <ul id={navType.id} className={navType.className} role="group" aria-label="...">
      { appState.navData.map((item)=>{
        const isActive = item.value === appState.subNav;
          return(
            <li 
              key={item.value}
              className={`${navType.liClassName} ${isActive ? 'active' : ''}`}
              data-value={item.value} 
              data-role={navType.liDataRole}
              title={item.title}
              onClick={(e) => {clickedSubNav(e, setAppState)}}
            >
              {item.title}
              { navType.badge && item.value === STATUS_CONFIG.NEW && <Badge type={STATUS_CONFIG.DEFAULT} value={countedField} />}
            </li>
          )
      })}
    </ul>
  );
}

 
export default SubNav;