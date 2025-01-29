import { useContext } from 'react';
import {subNavTop, subNavAside} from './../../helpers/variables';
import { AppContext } from './../../App/App';
import { Link } from 'react-router-dom';
import './style.css';
import Badge from '../Badge';

const SubNav = ({type, clickedSubNav}) => {
  const {navData, appState} = useContext(AppContext); 
  const navType = type === 'top' ? subNavTop : subNavAside;
  const countedField = appState.data.length;
  
  return (
    <ul id={navType.id} className={navType.className} role="group" aria-label="...">
      { navData.map((item)=>{
          return(
            <li key={item.value}>
              <Link 
                className={navType.linkClassName} 
                data-value={item.value} 
                data-role={navType.linkDataRole}
                title={item.title}
                to={''}
                onClick={(e) => {clickedSubNav(e)}}
              >
                {item.title}
                { navType.badge && item.value === 'new' && <Badge value={countedField}/>}
              </Link>
            </li>
          )
      })}
   
    </ul>
  );
}

 
export default SubNav;