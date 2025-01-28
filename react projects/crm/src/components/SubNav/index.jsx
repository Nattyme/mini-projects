import { useContext } from 'react';
import { AppContext } from './../../App/App';
import './style.css';
import { Link } from 'react-router-dom';

const SubNav = ({type}) => {
  const {navData} = useContext(AppContext);
  const isTop = type === 'top';
  
  return (
    <ul id={isTop ? "topStatusBar" : "asideStatusNav"} className={isTop ? "btn-group" : ""} role="group" aria-label="...">
      { navData.map((item)=>{
          return(
            <li key={item.value}>
              <Link 
                className={isTop ? "btn btn-light" : ""} 
                data-value={item.value} 
                data-role={isTop ? "left-status" : ""}
                title={item.title}
                to={item.value}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
   
    </ul>
  );
}
{/* <ul id="asideStatusNav">
<li><a data-value="all" data-role="left-status" href="#" className="active">Все вместе</a></li>
<li><a data-value="new" data-role="left-status" href="#" >Новые<div className="badge" id="badge-new"></div></a></li>
<li><a data-value="inwork" data-role="left-status" href="#">В работе</a></li>
<li><a data-value="completed" data-role="left-status" href="#">Завершенные</a></li>
</ul> */}
 
export default SubNav;