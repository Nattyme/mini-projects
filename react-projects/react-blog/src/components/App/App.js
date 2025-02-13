import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './../../pages/Home/Home';
import Create from './../../pages/Create/Create';
import Navbar from './../Navbar/Navbar';
import BlogDetails from './../../pages/BlogDetails/BlogDetails';
import NotFound from '../../pages/NotFound/NotFound';
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
              <Route path="/blogs/:id" element={<BlogDetails/>}/>
              <Route path="*" element={<NotFound/>}/>
           </Routes>
        </main>
		  </div>
    </Router>
		
	)
}

export default App;
