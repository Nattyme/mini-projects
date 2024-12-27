import Home from '../../pages/Home/Home';
import Navbar from './../Navbar/Navbar';
import './App.css';

function App() {
	return (
		<div className = "app">
      <Navbar/>
			<main className="main">
          <Home/>
			</main>
		</div>
	)
}

export default App;
