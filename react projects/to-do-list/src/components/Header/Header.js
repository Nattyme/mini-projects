import './Header.css';

const tasksProgress = (data, type) => {
  return data.filter( (el) => el.status === type).length;
}

const Header = (props) => {
	return (
		<header className="header">
			<h1 className="header-title">Список дел</h1>
			<span className="header-desc">{ tasksProgress(props.data,'active') } осталось, {tasksProgress(props.data,'done')} сделано</span>
		</header>
	)
}

export default Header;