import { useState, useEffect } from "react";
import { serverPath, STATUS_CONFIG } from "../helpers/variables";
import getRandomArrayData from "../utils/calcFunctions";
import { doFilter } from "../utils/filterFunctions";
import { prepareDisplayData } from "../utils/prepareDisplayData";
import { useLocation } from "react-router-dom";

const useAppState = () => {
  const [appState, setAppState] = useState({
    loading: true,
    error: null,
    formData: null,
    data: null,
    status: null,
    products: null,
    initialFormData: null,
    users: null,
    navData: null,
    subNav: STATUS_CONFIG.ALL,
    filterData: null,
    select: null
  });

  const location = useLocation();

  useEffect(() => {
    fetch(serverPath + "testData")
      .then((res) => res.json())
      .then((data) => {
        const randomData = getRandomArrayData(data);
        const { prepareDisplayFormData } = prepareDisplayData();
        const formNewData = prepareDisplayFormData(randomData);

        // update formData and initialFormData
        setAppState((prevState) => ({
          ...prevState,
          formData: formNewData,
          initialFormData: formNewData,
          loading: false,
        }));
      })
      .catch((error) => {
        setAppState((prevState) => ({
          ...prevState,
          error: error,
          loading: false,
        }));
      });
  }, [appState.data]);

  const getFetchData = (fieldsObj) => {
    fieldsObj.forEach(({ field, path }) => {
      fetch(serverPath + path)
        .then((res) => res.json())
        .then((data) => {
          // update fields
          setAppState((prevState) => ({
            ...prevState,
            [field]: data,
            loading: false,
          }));
        })
        .catch((error) => {
          setAppState((prevState) => ({
            ...prevState,
            error: error,
            loading: false,
          }));
        });
    });
  };

  useEffect(
    () =>
      getFetchData([
        { path: "data", field: "data" },
        { path: "products", field: "products" },
        { path: "users", field: "users" },
        { path: "status", field: "status" },
        { path: "status", field: "navData" },
        { path: "logo", field: "logo" },
        { path:"pages", field: "pages"}
      ]),
    [location.pathname]
  );

  useEffect(() => {
    if ( appState.data) {
      const tableData = doFilter('subNav', appState.subNav, appState.data);
      setAppState((prev) => ({
        ...prev,
        filterData: tableData,
      }));
    }
  }, [appState.subNav, appState.data]);

  useEffect(() => {
    if (! appState.data) return;

    let filteredData = doFilter('subNav', appState.subNav, appState.data);

    if ( appState.select) {
      filteredData = doFilter('select', appState.select, filteredData);
    }

    setAppState((prev) => ({
      ...prev,
      filterData: filteredData,
    }));

  }, [appState.subNav, appState.select, appState.data]);

  return { appState, setAppState };
};

export default useAppState;
