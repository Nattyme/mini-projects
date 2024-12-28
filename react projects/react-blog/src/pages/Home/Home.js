import { useEffect, useState } from 'react';
import BlogList from './../BlogList/BlogList';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    console.log('use effect run');
    fetch('http://localhost:8000/posts').then((res)=>{
      console.log(res);
      if(res.ok !== true) {
        throw Error('Could not fetch data from this resource')
      }
      
      return res.json();
    }).then((data) =>{
      console.log(data);
      setPosts(data);
      setLoading(false);
      setError(null);
    }).catch((err)=>{
      console.log(err.message);
      setError(err.message);
      setLoading(false);
    });
  }, []);


  return ( 
    <div className = "home">
      {error && <div>{error}</div>}
      {isLoading && <h3>Loading...</h3>}
      {posts && <BlogList posts={posts}/>}
    </div>
   
  );
}

export default Home;