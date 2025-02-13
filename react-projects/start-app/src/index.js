import ReactDOM from 'react-dom/client';

const Header = () => {
	return <h2>Список дел!!</h2>
}

const List = () => {
	const items = [
		{id: 0, title: 'Проснуться попозше'}, 
		{id: 1, title: 'Сделать зарядку'}, 
		{id: 2, title: 'Выпить кофе'}, 
		{id: 3, title: 'Написать еркат приложение'}
	];

	const render = items.map((el) => <li key={el.id}>{el.title}</li>);

	return (
		<ul>
			{render}
		</ul>
	)
}

const Footer = () => {
	return (
		<footer>
			<input type="text" placeholder='Новая задача' />
			<input type="submit" value="Добавить"/>
		</footer>
	)
}

const App = () => {
	return (
		<div>
			<Header/>
			<List/>
			<Footer/>
		</div>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<App/>
);
