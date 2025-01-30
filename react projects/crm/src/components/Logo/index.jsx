const Logo = ({title, subtitle}) => {
  
  return (
    <div className="left-panel__logo">
      <div className="left-panel__logo-title">{title}</div>
      <div className="left-panel__logo-subtitle">{subtitle}</div>
    </div>
  );
}
 
export default Logo;