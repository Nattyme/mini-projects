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
  const [products, setProducts] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [formData, setFormData] = useState(null);

  const setTimeStamp = () => {
    return Date.now();
  }
  const setStatus = () => {
    return 'new' 
  }

  const createNewTask = (task) => {
    task.timestamp = setTimeStamp();
    task.changed = setTimeStamp();
    task.status = setStatus();

    return task;
  }

  const btnClicked = async (e) => {
    if (e.target.dataset.btn === 'submit') {
      e.preventDefault();
      const newTask = createNewTask(formData);

      fetch( 'http://localhost:8000/data', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newTask)
      }).then((res) => {
        setTasks(res)
      })
    }
    
  }

  useEffect(()=>{
    fetch('http://localhost:8000/testData').then(res => res.json()).then((data) => {
      const randomData = getRandomArrayData(data);
      const formNewData  = prepareDisplayData(randomData);

      setFormData(formNewData);
      setLoading(false);
    }).catch( (error) => {
      setError(error);
      setLoading(false);
    })
 
  }, [tasks]);

  useEffect(()=> {
    fetch('http://localhost:8000/products').then(res => res.json()).then((data) => {
      setProducts(data);
      setLoading(false);
    }).catch( (error) => {
      setError(error);
      setLoading(false);
    })
  }, []);


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

 

  const navData = [
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

      <AppContext.Provider value={{formData, btnClicked, products, navData}}>
        <Routes>
          <Route path="/" element={
            formData && products && <FormPage title="Форма заявок"/>
          }></Route>
          <Route path="/tasks" element={<TablePage title="Работа с заявкой"/>}></Route>
          <Route path="/edit" element={<EditPage title="Работа с заявкой"/>}></Route>
        </Routes>
      </AppContext.Provider>
    
    </div>
  );
}

export default App;
