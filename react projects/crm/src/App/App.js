import { Routes, Route, useLocation } from "react-router-dom";
import { createContext } from "react";

import FormPage from "../pages/FormPage";
import HeaderNav from "../components/HeaderNav";
import TablePage from "../pages/Table";
import EditPage from "../pages/Edit";
import { serverPath } from "./../helpers/variables";
import useAppState from "../hooks/useAppState";
import { createNewTask } from "./../utils/taskUtils";
import { useFormHandlers } from "../hooks/useFormHandlers";
import { useBodyClass } from "../hooks/useBodyClass";
import "./App.css";

export const AppContext = createContext(null);

const App = () => {
  const location = useLocation();

  const {
    loading,
    error,
    testData,
    products,
    setTestData,
    data,
    users,
    formData,
    setData,
    setFormData,
    setLoading,
    setError,
    initialFormData,
  } = useAppState();
console.log(products);

  const {
    updateFieldValue, 
    clickedFieldTarget, 
    handleBlurValue
  } = useFormHandlers(formData, initialFormData, setFormData);

  const btnClicked = async (e) => {
    if (e.target.dataset.btn === "submit") {
      e.preventDefault();
      const newTask = createNewTask(formData);

      fetch(serverPath + 'data', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }).then(res => res.json()).then((newTaskData) => {
        setData((prevData) => {
return [...prevData, newTaskData]
        }) // Добав. новую задачу в БД
      })
    }
  };

  useBodyClass(location.pathname);

  const navData = [
    { value: "all", title: "Все" },
    { value: "new", title: "Новые" },
    { value: "inwork", title: "В работе" },
    { value: "completed", title: "Завершенные" },
  ];

  return (
    <div className="App">
      <HeaderNav />

      <AppContext.Provider
        value={{
          loading,
          formData,
          data,
          btnClicked,
          updateFieldValue,
          clickedFieldTarget,
          handleBlurValue,
          products,
          navData,
          users
        }}
      >
        <Routes>
          <Route
            path="/"
            element={formData && products && <FormPage title="Форма заявок" />}
          ></Route>
          <Route
            path="/tasks"
            element={products && users && <TablePage title="Все заявки" />}
          ></Route>
          <Route
            path="/edit"
            element={<EditPage title="Работа с заявкой" />}
          ></Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
};

export default App;
