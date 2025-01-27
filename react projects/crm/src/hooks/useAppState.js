import { useState, useEffect } from "react";
import { serverPath } from "../helpers/variables";
import getRandomArrayData from "../utils/calcFunctions";
import prepareDisplayData from "../utils/prepareDisplayData";

const useAppState = () => {
  const [appState, setAppState] = useState(
    {
      loading: true,
      error: null,
      formData: null,
      data: null,
      status: null,
      products: null,
      initialFormData: null,
      users: null
    }
  );

  useEffect(() => {
    fetch(serverPath + 'testData')
      .then((res) => res.json())
      .then((data) => {
        const randomData = getRandomArrayData(data);
        const formNewData = prepareDisplayData(randomData);

        // update formData and initialFormData
        setAppState((prevState) => (
          {
            ...prevState,
            formData: formNewData,
            initialFormData: formNewData,
            loading: false,
          }
        ))
      })
      .catch((error) => {
        setAppState((prevState) => (
          {
            ...prevState,
            error: error,
            loading: false
          }
        ))
      });
  }, [appState.data]);

  const getFetchData = (fieldsObj) => {
    fieldsObj.forEach(({field, path}) => {
      fetch(serverPath + path)
      .then((res) => res.json())
      .then((data) => {

        // update fields
        setAppState((prevState) => ({
            ...prevState,
            [field]: data,
            loading: false
        }))
      })
      .catch((error) => {
        setAppState((prevState)=>({
            ...prevState,
            error: error,
            loading: false
        }))
      });
    });

  }

  useEffect(() => getFetchData(
    [
      {path: 'data', field: 'data'},
      {path: 'products', field: 'products'},
      {path: 'users', field: 'users'},
      {path: 'status', field: 'status'},
    ]
  ), []);
  
  return {appState, setAppState};
};

export default useAppState;
