import { useState, useEffect } from "react";
import { serverPath } from "../helpers/variables";
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
    data: null,
    products: null,
    users: null
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

  // // Изменение фильтра 
  // useEffect(() => {
  //   if (appState.data) {
      
  //     let filteredData = doFilter('subNav', appState.subNav, appState.data);

  //     if ( appState.select) {
  //       filteredData = doFilter('select', appState.select, filteredData);
  //     }

  //     setAppState((prev) => ({
  //       ...prev,
  //       filterData: filteredData,
  //     }));
  //   }

  // }, [appState.subNav, appState.select, appState.data]);

  return { appState, setAppState, editFormState, setEditFormState };
};

export default useAppState;
