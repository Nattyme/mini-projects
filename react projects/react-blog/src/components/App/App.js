import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './../../pages/Home/Home';
import Create from './../../pages/Create/Create';
import Navbar from './../Navbar/Navbar';
import './App.css';

function App() {
	return (
    <Router>
      <div className = "app">
        <Navbar/>
        <main className="main">
           <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/create" element={<Create/>}/>
           </Routes>
        </main>
		  </div>
    </Router>
		
	)
}

export default App;
