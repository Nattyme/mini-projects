import './App.css';

import Header from './../Header/Header';
import Footer from './../Footer/Footer';

import Search from './../Search/Search';

const App = () => {
  return (
    <body className="todo-app p-5">
      {<Header/>}
      {<Search/>}
      {<Footer/>}
    </body>
  )
}

export default App;