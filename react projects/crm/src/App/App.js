import { Routes, Route, useLocation } from "react-router-dom";
import { createContext } from "react";

import FormPage from "../pages/FormPage";
import HeaderNav from "../components/HeaderNav";
import TablePage from "../pages/Table";
import EditPage from "../pages/Edit";
import { serverPath } from "../helpers/variables";
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
    products,
    formData,
    setTasks,
    setFormData,
    setLoading,
    setError,
    initialFormData,
  } = useAppState();

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
      }).then((res) => {
        setTasks(res);
      });
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
          formData,
          btnClicked,
          updateFieldValue,
          clickedFieldTarget,
          handleBlurValue,
          products,
          navData,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={formData && products && <FormPage title="Форма заявок" />}
          ></Route>
          <Route
            path="/tasks"
            element={<TablePage title="Работа с заявкой" />}
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
