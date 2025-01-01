import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Navbar from './../Navbar/Navbar';
import './App.css';

function App() {
	return (
    <Router>
      <div className = "app">
        <Navbar/>
        <main className="main">
           <Routes>
              <Route path="/" elem={<Home/>}/>
           </Routes>
        </main>
		  </div>
    </Router>
		
	)
}

export default App;
