import { useState, useEffect } from "react";
import { serverPath } from "../helpers/variables";
import getRandomArrayData from "../utils/calcFunctions";
import prepareDisplayData from "../utils/prepareDisplayData";

const useAppState = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [data, setData] = useState(null);
  const [products, setProducts] = useState(null);
  const [initialFormData, setInitialFormData] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch(serverPath + 'testData')
      .then((res) => res.json())
      .then((data) => {
        const randomData = getRandomArrayData(data);
        const formNewData = prepareDisplayData(randomData);

        setFormData(formNewData);
        setInitialFormData(formNewData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [data]);

  useEffect(() => {
    fetch(serverPath + 'data')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(serverPath + 'products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch(serverPath + 'users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log('Данные пользователя Загружены');
        
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(()=>{
    console.log(products);
    
  },[products])  
  
  return {
    loading,
    error,
    testData,
    data,
    users,
    products,
    formData,
    setTestData,
    setData,
    setFormData,
    initialFormData,
    setInitialFormData,
    setLoading,
    setError,
  };
};

export default useAppState;
