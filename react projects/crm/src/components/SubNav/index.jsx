import { useContext } from 'react';
import {subNavTop, subNavAside} from './../../helpers/variables';
import { AppContext } from './../../App/App';
import { Link } from 'react-router-dom';
import './style.css';
import Badge from '../Badge';

const SubNav = ({type}) => {
  const {navData} = useContext(AppContext);
  const navType = type === 'top' ? subNavTop : subNavAside;

  
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
                to={item.value}
              >
                {item.title}
                { navType.badge && navType.className.includes('active') && <Badge value="4"/>}
              </Link>
            </li>
          )
        })}
   
    </ul>
  );
}

 
export default SubNav;