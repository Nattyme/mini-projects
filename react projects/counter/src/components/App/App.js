import Input from './../Input/Input';
import './App.css';

const App = () => {
  return (
    <div className = 'app p-3'>
      <h1>Counter</h1>
      <Input/>
      
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-outline-primary" id="btnMinus">Minus</button>
        <button type="button" className="btn btn-outline-primary" id="btnReset">Reset</button>
        <button type="button" className="btn btn-outline-primary" id="btnPlus">Plus</button>
      </div>
    </div>
  )
}

export default App;
