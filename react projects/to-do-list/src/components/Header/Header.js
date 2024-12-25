import './Header.css';

const tasksProgress = (data, isDone) => {
  return data.filter( (el) => el.done === isDone);
}


const Header = (props) => {
	return (
		<header className="header">
			<h1 className="header-title">Список дел</h1>
			<span className="header-desc">{ tasksProgress(props.data, false).length } осталось, {tasksProgress(props.data, true).length} сделано</span>
		</header>
	)
}

export default Header;