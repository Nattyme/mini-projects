import data from './../../data/data.json';
import BlogList from './../BlogList/BlogList';
import './Home.css';

const Home = () => {
  const blog = data.blog;
console.log(blog);

  return ( 
    <div className = "home">
      <BlogList blog={blog}/>
    </div>
   
  );
}

export default Home;