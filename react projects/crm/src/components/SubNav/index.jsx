import { useContext } from 'react';
import {subNavTop, subNavAside} from './../../helpers/variables';
import { AppContext } from './../../App/App';
import { Link } from 'react-router-dom';
import './style.css';
import Badge from '../Badge';

const SubNav = ({type}) => {
  const {navData} = useContext(AppContext);
  const navType = type === 'top' ? subNavTop : subNavAside;
  const clickedSubNav = (e) => {

    if (e.target.dataset.role === 'left-status') {
      const navList = e.target.closest('ul');
      console.log(navList);
      
      if (navList) {
        const navItems = navList.querySelectorAll('a');
        navItems.forEach((item) => {
          console.log(item);
          
          item.classList.remove('active');
        })
      }
      
      e.target.classList.add('active');
    }
   
  }

  
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
                { navType.badge && navType.className.includes('active') && <Badge value="4"/>}
              </Link>
            </li>
          )
        })}
   
    </ul>
  );
}

 
export default SubNav;