import RequestForm from '../RequestForm';
import './style.css';

/**
 * Компонент WhitePlate.
 * Отображает блок с белым фоном, который включает заголовок с разделением текста и форму.
 * 
 * @component
 * 
 * @param {Object} props
 * @param {string} props.title - Заголовок для отображения в блоке, который будет разделен на две части.
 * 
 * @returns {JSX.Element} Разметка для отображения белого блока с заголовком и формой.
*/
const WhitePlate = ({title, formState}) => {
  
  return (
    <div className="white-plate white-plate--payment">
      <div className="container-fluid">

        <div className="white-plate__header text-center">
          <p className="white-plate__logo">
            <span>{title.split(' ')[0]}</span>{' ' + title.split(' ')[1]}
          </p>
        </div>

        <div className="white-plate__line-between white-plate__line-between--main"></div>
        <RequestForm formState={formState}/>
      </div>
    </div>
  );
}
 
export default WhitePlate;