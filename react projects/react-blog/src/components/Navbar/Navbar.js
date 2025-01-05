import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
return (
	<nav className="navBar">
	<h1>React Blog</h1>
	<div className="links">
		<Link to="/">Home</Link>
		<Link to="/create">New post</Link>
	</div>
	</nav>
);
}

export default Navbar;