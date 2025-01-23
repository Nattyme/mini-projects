import { useState, useEffect } from "react";
import getRandomArrayData from "../utils/calcFunctions";
import prepareDisplayData from "../utils/prepareDisplayData";

const useAppState = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [formData, setFormData] = useState(null);
  const [initialFormData, setInitialFormData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/testData")
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
  }, [tasks]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    error,
    products,
    tasks,
    formData,
    setTasks,
    setFormData,
    initialFormData,
    setInitialFormData,
    setLoading,
    setError,
  };
};

export default useAppState;
