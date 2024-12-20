import './App.css';

import Header from './../Header/Header';
import Footer from './../Footer/Footer';

const App = () => {
  return (
    <body className="todo-app p-5">
      {<Header/>}
      {<Footer/>}
    </body>
  )
}

export default App;