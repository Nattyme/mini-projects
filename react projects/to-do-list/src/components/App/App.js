import './App.css';

import Header from './../Header/Header';
import Footer from './../Footer/Footer';

import Search from './../Search/Search';
import List from './../List/List';

const App = () => {
  return (
    <section className="todo-app p-5">
      {<Header/>}
      {<Search/>}
      {<List/>}
      {<Footer/>}
    </section>
  )
}

export default App;