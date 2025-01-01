import './Navbar.css';

const Navbar = () => {
return (
	<nav className="navBar">
	<h1>React Blog</h1>
	<div className="links">
		<a href="/">Home</a>
		<a href="/create">New post</a>
	</div>
	</nav>
);
}

export default Navbar;