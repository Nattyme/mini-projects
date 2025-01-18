import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

import FormPage from '../pages/FormPage';
import './App.css';
import HeaderNav from '../components/HeaderNav';
import TablePage from '../pages/Table';
import EditPage from '../pages/Edit';

const App = () => {
  const location = useLocation();

  useEffect( () => {
    const path = location.pathname;
    console.log(path);

    document.body.classList.remove('with-nav', 'radial-bg', 'flex-center', 'body--dashboard');

    switch (path) {
      case '/' :
        document.body.classList.add('with-nav', 'radial-bg', 'flex-center');
        break;
      case '/tasks' :
        document.body.classList.add('with-nav', 'body--dashboard');
        break;
      default:
        document.body.classList.add('with-nav');
    };

    return () => {
      document.body.classList.remove('radial-bg', 'flex-center', 'body--dashboard', 'with-nav');
    }
    
  }, [location]);
  
  return (
    <div className="App">
      <HeaderNav/>
      <Routes>
        <Route path="/" element={<FormPage/>}></Route>
        <Route path="/tasks" element={<TablePage/>}></Route>
        <Route path="/edit" element={<EditPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
