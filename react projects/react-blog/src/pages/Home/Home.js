import { useEffect, useState } from 'react';
import BlogList from './../BlogList/BlogList';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(()=>{
    console.log('use effect run');
    fetch('http://localhost:8000/posts').then((res)=>{
      return res.json();
    }).then((data) =>{
      console.log(data);
      setPosts(data);
    });
  }, []);


  return ( 
    <div className = "home">
      {posts && <BlogList posts={posts}/>}
    </div>
   
  );
}

export default Home;