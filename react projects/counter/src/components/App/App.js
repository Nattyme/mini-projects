import Input from './../Input/Input';
import Button from './../Button/Button';
import './App.css';

const App = () => {
  const buttons = [
    {
      id : 'btnMinus',
      type : 'button',
      classNames : 'btn btn-outline-primary',
      text : 'Minus'
    },
    {
      id : 'btnReset',
      type : 'button',
      classNames : 'btn btn-outline-primary',
      text : 'Reset'
    },
    {
      id : 'btnPlus',
      type : 'button',
      classNames : 'btn btn-outline-primary',
      text : 'Plus'
    }
  ];
  return (
    <div className = 'app p-3'>
      <h1>Counter</h1>
      <Input/>

      <div className="btn-group" role="group" aria-label="Basic example">
        <Button/>
        <button type="button" className="btn btn-outline-primary" id="btnPlus">Plus</button>
      </div>
    </div>
  )
}

export default App;
