import {Link} from 'react-router-dom';
import './style.css';

const HeaderNav = () => {
  return (  
    <nav className="project-nav">
      <div className="project-nav__links-wrapper">
        <Link to="/" title="Перейти к форме добавления заявок">Форма добавления заявок</Link>
        <Link to="/tasks" title="Перейти к таблице с заявками">Таблица с заявками</Link>
        <Link to="/edit" title="Перейти к редактированию заявки">Редактирование заявки</Link>
      </div>
    </nav>
  );
}

export default HeaderNav;