import './style.css';

const HeaderNav = () => {
return (  
	<nav className="project-nav">
		<div className="project-nav__links-wrapper">
			<a href="index.html">Форма добавления заявок</a>
			<a href="./html/table.html">Таблица с заявками</a>
			<a href="./html/edit.html">Редактирование заявки</a>
		</div>
	</nav>
);
}

export default HeaderNav;