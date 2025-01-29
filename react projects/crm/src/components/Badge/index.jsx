import './style.css';

const Badge = ({classNames, value, id=''}) => {
  //  (<div className="badge" id="badge-new">{value}</div>);
  return (<div className={classNames} id={id}>{value}</div>);
}
 
export default Badge;