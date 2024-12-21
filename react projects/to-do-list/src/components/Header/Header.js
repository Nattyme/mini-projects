import './Header.css';
import data from './../../data/data.json';

const tasksProgress = (type) => {
  return data.filter( (el) => el.status === type).length;
}

const Header = () => {
	return (
		<header className="header">
			<h1 className="header-title">Список дел</h1>
			<span className="header-desc">{ tasksProgress('active') } осталось, {tasksProgress('done')} сделано</span>
		</header>
	)
}

export default Header;