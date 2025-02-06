import { useState, useEffect } from "react";
import { serverPath, STATUS_CONFIG } from "../helpers/variables";
import getRandomArrayData from "../utils/calcFunctions";
import { doFilter } from "../utils/filterFunctions";
import { prepareDisplayData } from "../utils/prepareDisplayData";
import { useLocation } from "react-router-dom";


/**
 * Хук, управляющий состоянием приложения.
 * Загружает данные с сервера, фильтрует их и сохраняет в состоянии.
 *
 * @returns {Object} Объект с состоянием приложения и функцией для его обновления.
 * @returns {Object} appState - состояние приложения.
 * @returns {boolean} appState.loading - индикатор загрузки данных.
 * @returns {Error|null} appState.error - ошибка, если она возникла при загрузке данных.
 * @returns {Object|null} appState.formData - данные формы, подготовленные для отображения.
 * @returns {Array|null} appState.data - основные данные приложения.
 * @returns {Object|null} appState.status - статус приложения.
 * @returns {Array|null} appState.products - список продуктов.
 * @returns {Object|null} appState.initialFormData - начальные данные формы.
 * @returns {Array|null} appState.users - данные пользователей.
 * @returns {Object|null} appState.navData - данные для навигации.
 * @returns {string} appState.subNav - текущий выбранный фильтр для подменю.
 * @returns {Array|null} appState.filterData - данные после применения фильтров.
 * @returns {Object|null} appState.select - выбранные данные для фильтрации.
 * @returns {function} setAppState - функция для обновления состояния приложения.
*/
const useAppState = () => {
  // Начальные значения для состояний app
  const [appState, setAppState] = useState({
    loading: true,
    error: null,
    formData: null,
    data: null,
    status: null,
    products: null,
    initialFormData: null,
    // users: null,
    // navData: null,
    // subNav: STATUS_CONFIG.ALL,
    // filterData: null,
    // select: null,
    // countedField: null
  });

  const [formState, setFormState] = useState({
    formData: null,
    products: null
  });

  const [tableState, setTableState] = useState({
    users: null,
    navData: null,
    subNav: STATUS_CONFIG.ALL,
    filterData: null,
    select: null,
    countedField: null,
    data: null,
    status: null,
    products: null,
  });

  const [editFormState, setEditFormState] = useState({
    formData: null,
    initialFormData: null,
    status: null,
    products: null
  })

  const location = useLocation();

  // Получение данных с сервера
  const getFetchData = (fieldsObj) => {
    fieldsObj.forEach(({ field, path }) => {
      fetch(serverPath + path)
        .then((res) => res.json())
        .then((data) => {
          // Обновление полей
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

  // Получает данные с сервера при измненеии url
  useEffect(() => {
      getFetchData([
        { path: "data", field: "data" },
        { path: "products", field: "products" },
        { path: "users", field: "users" },
        { path: "status", field: "status" },
        { path: "status", field: "navData" },
        { path: "logo", field: "logo" },
        { path:"pages", field: "pages"}
      ])},
    [location.pathname]
  );

  // Изменение фильтра 
  useEffect(() => {
    if (appState.data) {
      
      let filteredData = doFilter('subNav', appState.subNav, appState.data);

      if ( appState.select) {
        filteredData = doFilter('select', appState.select, filteredData);
      }

      setAppState((prev) => ({
        ...prev,
        filterData: filteredData,
      }));
    }

  }, [appState.subNav, appState.select, appState.data]);

  return { appState, setAppState };
};

export default useAppState;
