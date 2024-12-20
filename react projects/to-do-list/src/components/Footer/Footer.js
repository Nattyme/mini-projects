import './Footer.css';

import Input from  './../Inputs/Input';
import Button from  './../Buttons/Buttons';


const Footer = () => {
	return (
		<footer className="footer">
      <Input type="text" placeholder="Что необходимо сделать" classNames="form-control me-2"/>
      <Button classNames='btn-primary' text='Добавить'/>
		</footer>
	)
}

export default Footer;