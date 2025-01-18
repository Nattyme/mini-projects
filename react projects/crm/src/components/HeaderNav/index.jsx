import {Link} from 'react-router-dom';
import './style.css';

const HeaderNav = () => {
  return (  
    <nav className="project-nav">
      <div className="project-nav__links-wrapper">
        <Link to="/">Форма добавления заявок</Link>
        <Link to="/tasks">Таблица с заявками</Link>
        <Link to="/edit">Редактирование заявки</Link>
      </div>
    </nav>
  );
}

export default HeaderNav;