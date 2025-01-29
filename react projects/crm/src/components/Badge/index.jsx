import './style.css';

const Badge = ({type, value, id=''}) => {
  const config = [
    {
      type: 'danger',
      classNames: 'badge-pill badge-danger'
    },
   
    {
      type: 'neutral',
      classNames: 'badge-pill badge-warning'
    },
   
    {
      type: 'success',
      classNames: 'badge-pill badge-success'
    }
  ];

  const badgeType = config.find(badge => badge.type === type);

  return (<div className={`badge + ${badgeType?.classNames}`} id={id}>{value}</div>);
}
 
export default Badge;