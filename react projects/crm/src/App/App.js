import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FormPage from '../pages/FormPage';
import './App.css';
import HeaderNav from '../components/HeaderNav';
import TablePage from '../pages/Table';
import EditPage from '../pages/Edit';

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderNav/>
        <Routes>
          <Route path="/" element={<FormPage/>}></Route>
          <Route path="/tasks" element={<TablePage/>}></Route>
          <Route path="/edit" element={<EditPage/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
