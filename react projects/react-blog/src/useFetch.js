import {useState, useEffect} from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    console.log('useEffect');
    const abortCont = new AbortController();
    setTimeout(
     () => {
 
      fetch(url, {signal: abortCont.signal}).then((res)=>{
        if(res.ok !== true) {
          throw Error('Could not fetch data from this resource')
        }
        
        return res.json();
      }).then((data) =>{
        console.log(data);
        
        setData(data);
        setLoading(false);
        setError(null);
      }).catch((err)=>{
        if (err.name === "AbortError") {
          console.log('fetch aborted');
        } else {
          setError(err.message);
          setLoading(false);
        }
      });
     }, 1000
    )
 

    return () => {
      console.log('clean');
      abortCont.abort();
    }
  }, []);

  return {data, isLoading, error}
}

export default useFetch;