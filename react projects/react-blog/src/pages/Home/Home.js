import { useState } from 'react';
import data from './../../data/data.json';
import BlogList from './../BlogList/BlogList';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState(data.blog);

  const handleDelete = (id) => {
    const newPosts = posts.filter( (post) => post.id !== id);
    setPosts(newPosts);
  }


  return ( 
    <div className = "home">
      <BlogList posts={posts} handleDelete = {handleDelete}/>
    </div>
   
  );
}

export default Home;