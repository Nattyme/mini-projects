import { useEffect, useState } from 'react';
import data from './../../data/data.json';
import BlogList from './../BlogList/BlogList';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState(data.blog);
  const [name, setName] = useState('Jim');
  const handleDelete = (id) => {
    const newPosts = posts.filter( (post) => post.id !== id);
    setPosts(newPosts);
  }

  useEffect(()=>{
    console.log('use effect run');
    
  }, [name]);


  return ( 
    <div className = "home">
      <BlogList posts={posts} handleDelete = {handleDelete}/>
      <button onClick={()=>{setName('Tom')}}>{name}</button>
    </div>
   
  );
}

export default Home;