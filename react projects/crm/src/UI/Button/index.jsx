import './style.css';

const Button = ({text, className="btn", type="submit", dataBtn, onClick}) => {
  return (
    <button data-btn ={dataBtn} type={type} className={className} onClick={onClick}>{text}</button>
  );
}
 
export default Button;