import {Routes, Route, useLocation} from 'react-router-dom';
import {useState, useEffect, createContext} from 'react';

import FormPage from '../pages/FormPage';
import './App.css';
import HeaderNav from '../components/HeaderNav';
import TablePage from '../pages/Table';
import EditPage from '../pages/Edit';
import getRandomArrayData from './../utils/calcFunctions';
import prepareDisplayData from './../utils/prepareDisplayData';

export const AppContext = createContext(null);

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);
  const [products, setProducts] = useState(null);
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
    fetch('http://localhost:8000/products').then(res => res.json()).then((data) => {
      setProducts(data);
      setLoading(false);
    }).catch( (error) => {
      setError(error);
      setLoading(false);
    })
  }, []);

  useEffect(()=> {
    if (testData) {
      const newTask = getNewTask(testData);
      setFormData(newTask);
    }
  
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

      <AppContext.Provider value={{formData, products}}>
        <Routes>
          <Route path="/" element={
            formData && products && <FormPage statusData={statusData} title="Форма заявок"/>
          }></Route>
          {/* <Route path="/tasks" element={<TablePage products={testData} statusData={statusData} title="Работа с заявкой"/>}></Route>
          <Route path="/edit" element={<EditPage products={testData} statusData={statusData} title="Работа с заявкой"/>}></Route> */}
        </Routes>
      </AppContext.Provider>
    
    </div>
  );
}

export default App;
