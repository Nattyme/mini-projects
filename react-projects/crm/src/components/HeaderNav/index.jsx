import {Link} from 'react-router-dom';
import './style.css';


/**
 * Компонент HeaderNav.
 * Отображает навигацию для перехода между основными страницами приложения: форма добавления заявок, таблица заявок и редактирование заявки.
 * Используется для создания навигационного меню с ссылками на страницы приложения.
 * 
 * @component
 * @returns {JSX.Element} Разметка навигации с тремя ссылками на различные страницы приложения.
*/
const HeaderNav = () => {
  return (  
    <nav className="project-nav">
      <div className="project-nav__links-wrapper">
        <Link to="/" title="Перейти к форме добавления заявок">Форма добавления заявок</Link>
        <Link to="/tasks" title="Перейти к таблице с заявками">Таблица с заявками</Link>
      </div>
    </nav>
  );
}

export default HeaderNav;