import './style.css';

const SubNav = ({type, data}) => {
  const isTop = type === 'top';
  console.log(data);
  return (
    <ul id={isTop ? "topStatusBar" : "asideStatusNav"} className={isTop ? "btn-group" : ""} role="group" aria-label="...">
      { data.map((item)=>{
          return(
            <li key={item.value}>
              <a href="#" className={isTop ? "btn btn-light" : ""} data-value={item.value} data-role={isTop ? "left-status" : ""}>
                {item.title}
              </a>
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