import './Footer.css';

import Input from  './../Inputs/Input';
import Button from  './../Buttons/Buttons';


const Footer = () => {
	return (
		<footer className="footer">
      <Input placeholder="Что необходимо сделать"/>
      <Button classNames='btn-primary' text='Добавить'/>
		</footer>
	)
}

export default Footer;