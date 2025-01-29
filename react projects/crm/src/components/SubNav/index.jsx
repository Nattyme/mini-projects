import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION_CONFIG, STATUS_CONFIG  } from './../../helpers/variables';
import { AppContext } from './../../App/App';
import Badge from '../Badge';
import './style.css';

const SubNav = ({type, clickedSubNav, subNav}) => {
  const {navData, appState} = useContext(AppContext); 
  const {subNavTop, subNavAside } = NAVIGATION_CONFIG;
  const navType = type === 'top' ? subNavTop : subNavAside;
  const countedField = appState.data.length;
  
  return (
    <ul id={navType.id} className={navType.className} role="group" aria-label="...">
      { navData.map((item)=>{
        const isActive = item.value === subNav;
          return(
            <li key={item.value}>
              <Link 
                className={`${navType.linkClassName} ${isActive ? 'active' : ''}`}
                data-value={item.value} 
                data-role={navType.linkDataRole}
                title={item.title}
                to={''}
                onClick={(e) => {clickedSubNav(e)}}
              >
                {item.title}
                { navType.badge && item.value === STATUS_CONFIG.NEW && <Badge type={STATUS_CONFIG.DEFAULT} value={countedField} />}
              </Link>
            </li>
          )
      })}
    </ul>
  );
}

 
export default SubNav;