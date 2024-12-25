import './App.css';

const App = () => {
  return (
    <div className = 'app'>
      <h1>Counter</h1>

      <input type="number" className="form-control mb-3" id="input" disabled value="0"/>

      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-outline-primary" id="btnMinus">Minus</button>
        <button type="button" className="btn btn-outline-primary" id="btnReset">Reset</button>
        <button type="button" className="btn btn-outline-primary" id="btnPlus">Plus</button>
      </div>
    </div>
  )
}

export default App;
