import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

import FormPage from '../pages/FormPage';
import './App.css';
import HeaderNav from '../components/HeaderNav';
import TablePage from '../pages/Table';
import EditPage from '../pages/Edit';
import getRandomArrayData from './../utils/calcFunctions';
import prepareDisplayData from './../utils/prepareDisplayData';

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);
  const [tasks, setTask] = useState(null);
  const [formData, setFormData] = useState(null);

  const getNewTask = (data) => {
    const newTask = getRandomArrayData(data);
    return prepareDisplayData(newTask);
  }

  useEffect(()=> {
    fetch('http://localhost:8000/testData').then(res => res.json()).then((data) => {
      setTestData(data);
      setLoading(false);
    }).catch( (error) => {
      setError(error);
      setLoading(false);
    })
  }, []);

  useEffect(()=> {
    const newTask = getNewTask(testData);
    console.log(newTask);
    
    setFormData(newTask);
  }, [testData]);


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

  return (
    <div className="App">
      <HeaderNav/>
      <Routes>
        <Route path="/" element={<FormPage data={formData} statusData={statusData} title="Форма заявок"/>}></Route>
        {/* <Route path="/tasks" element={<TablePage products={testData} statusData={statusData} title="Работа с заявкой"/>}></Route>
        <Route path="/edit" element={<EditPage products={testData} statusData={statusData} title="Работа с заявкой"/>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
