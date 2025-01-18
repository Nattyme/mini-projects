import './style.css';

const Button = ({text, className="btn", type="submit"}) => {
  return (
    <button type={type} className={className}>{text}</button>
  );
}
 
export default Button;