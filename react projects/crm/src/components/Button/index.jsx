import './style.css';

const Button = ({text, className="btn", type="submit", dataBtn, btnClicked}) => {
  return (
    <button data-btn ={dataBtn} type={type} className={className} onClick={btnClicked}>{text}</button>
  );
}
 
export default Button;