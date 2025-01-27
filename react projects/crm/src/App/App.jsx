import { Routes, Route, useLocation } from "react-router-dom";
import { createContext } from "react";

import FormPage from "../pages/FormPage";
import HeaderNav from "../components/HeaderNav";
import TablePage from "../pages/Table";
import EditPage from "../pages/Edit";
import { serverPath } from "../helpers/variables";
import useAppState from "../hooks/useAppState";
import { createNewTask } from "../utils/taskUtils";
import { useFormHandlers } from "../hooks/useFormHandlers";
import { useBodyClass } from "../hooks/useBodyClass";
import "./App.css";
import Loader from "../components/Loader";

export const AppContext = createContext(null);

const App = () => {
  const location = useLocation();
  const {appState, setAppState} = useAppState();

  // functions to handle form fields
  const {
    updateFieldValue, 
    clickedFieldTarget, 
    handleBlurValue
  } = useFormHandlers(appState.formData, appState.initialFormData, setAppState);
  
  const btnClicked = async (e) => {
    if (e.target.dataset.btn === "submit") {
      e.preventDefault();
      const newTask = createNewTask(appState.formData);

      fetch(serverPath + 'data', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }).then(res => res.json()).then((newTaskData) => {
        setAppState((prevData) => (
          {
          ...prevData,
          data: [...prevData.data, newTaskData]
        })) 
      })
    }
  };


  useBodyClass(location.pathname);

  const navData = appState.status;
 
  return (
    <div className="App">
      <HeaderNav />

      <AppContext.Provider
        value={{
          appState,
          setAppState,
          btnClicked,
          updateFieldValue,
          clickedFieldTarget,
          handleBlurValue,
          navData,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={appState.loading ? <Loader/> : appState.formData && appState.products && <FormPage title="Форма заявок" />}
          ></Route>
          <Route
            path="/tasks"
            element={appState.loading ? <Loader/> : appState.products && appState.users && <TablePage title="Все заявки" />}
          ></Route>
          <Route
            path="/edit/:id"
            element={<EditPage title="Работа с заявкой" />}
          ></Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
};

export default App;
