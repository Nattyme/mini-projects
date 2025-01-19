import './style.css';

const StatusBar = ({type, statusData}) => {
  const isTop = type === 'top';
 
  return (
    <ul id={isTop ? "topStatusBar" : "asideStatusNav"} className={isTop ? "btn-group" : ""} role="group" aria-label="...">
      {
        statusData.map((status)=>{
          return(
            <li>
              <a href="#" className={isTop ? "btn btn-light" : ""} data-value={status.data} data-role={isTop ? "left-status" : ""}>
                {status.text}
              </a>
            </li>
          )
        })
      }
   
    </ul>
  );
}
{/* <ul id="asideStatusNav">
<li><a data-value="all" data-role="left-status" href="#" className="active">Все вместе</a></li>
<li><a data-value="new" data-role="left-status" href="#" >Новые<div className="badge" id="badge-new"></div></a></li>
<li><a data-value="inwork" data-role="left-status" href="#">В работе</a></li>
<li><a data-value="completed" data-role="left-status" href="#">Завершенные</a></li>
</ul> */}
 
export default StatusBar;