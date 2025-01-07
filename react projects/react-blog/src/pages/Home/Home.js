import {useEffect, useState } from 'react';
import BlogList from './../BlogList/BlogList';
import useFetch from '../../useFetch'
import './Home.css';

const Home = () => {
  const {data, isLoading, error} = useFetch('http://localhost:8000/posts');
  const [updateFlag, setUpdateFlag] = useState(false);

  return ( 
    <div className = "home">
      {error && <div>{error}</div>}
      {isLoading && <h3>Loading...</h3>}
      {data && <BlogList updateFlag = {updateFlag} setUpdateFlag = {setUpdateFlag} posts={data}/>}
    </div>
   
  );
}

export default Home;