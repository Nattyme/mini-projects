import { useContext } from 'react';
import { AppContext } from '../../App/App';
import './style.css';

const Button = ({text, className="btn", type="submit", dataBtn}) => {
  const {btnClicked} = useContext(AppContext);
  return (
    <button data-btn ={dataBtn} type={type} className={className} onClick={(e)=>{btnClicked(e)}}>{text}</button>
  );
}
 
export default Button;