import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

import FormPage from '../pages/FormPage';
import './App.css';
import HeaderNav from '../components/HeaderNav';
import TablePage from '../pages/Table';
import EditPage from '../pages/Edit';
import getRandomArrayData from './../utils/calcFunctions';
import prepareDisplayData from './../utils/prepareDisplayData';

import data from './../data/data.json';

const App = () => {
  const location = useLocation();
  const [tasks, setTask] = useState(null);

  const products = data.products;
  const setFormData = (data) => {
    const newTask = getRandomArrayData(data);
    const newTaskFormatted = prepareDisplayData(newTask);
    setFormData(taskFormatted, formElems); // заполним форму значениями задачи
    console.log(newTaskFormatted);
  }
  const statusData = [
    {
      value : 'all',
      title : 'Все',
    },
    {
      value : 'new',
      title : 'Новые'
    },
    {
      value : 'inwork',
      title : 'В работе'
    },
    {
      value : 'completed',
      title : 'Завершенные'
    }
  ];

  useEffect(()=>{
    fetch('http://localhost:8000/testData').then(res=>res.json()).then((testData)=>{
      setFormData(testData);
    });
  }, []);

  useEffect(()=>{
    fetch('http://localhost:8000/data').then(res => res.json()).then((data)=> {
      console.log(tasks);
    })
  }, [tasks])

  useEffect( () => {
    const path = location.pathname;
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
        <Route path="/" element={<FormPage products={products} statusData={statusData} title="Форма заявок"/>}></Route>
        <Route path="/tasks" element={<TablePage products={products} statusData={statusData} title="Работа с заявкой"/>}></Route>
        <Route path="/edit" element={<EditPage products={products} statusData={statusData} title="Работа с заявкой"/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
