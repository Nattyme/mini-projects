import './Footer.css';

import Button from  './../Buttons/Buttons';

const Footer = () => {
	return (
		<footer className="footer">
			<input type="text" placeholder="Что необходимо сделать" className="form-control me-2" />
      {<Button classNames='btn-primary' text='Добавить'/>}
		</footer>
	)
}

export default Footer;