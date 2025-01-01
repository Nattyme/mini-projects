import {useState, useEffect} from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    fetch(url).then((res)=>{
      if(res.ok !== true) {
        throw Error('Could not fetch data from this resource')
      }
      
      return res.json();
    }).then((data) =>{
      setData(data);
      setLoading(false);
      setError(null);
    }).catch((err)=>{
      setError(err.message);
      setLoading(false);
    });
  }, []);

  return {data, isLoading, error}
}

export default useFetch;