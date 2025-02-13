import { Routes, Route, useLocation } from "react-router-dom";
import { createContext } from "react";

import useAppState from "../hooks/useAppState";
import { useBodyClass } from "../hooks/useBodyClass";
import FormPage from "../pages/FormPage";
import HeaderNav from "../components/HeaderNav";
import TablePage from "../pages/TablePage";
import EditPage from "../pages/Edit";
import Loader from "../components/Loader";
import "./style.css";

export const AppContext = createContext(null);
export const FormPageContext = createContext(null);
export const TablePageContext = createContext(null);
export const EditPageContext = createContext(null);

const App = () => {
  const location = useLocation();
  useBodyClass(location.pathname); // Установим класс для body в зав-ти от текущей страницы
  const { appState, setAppState } = useAppState();

  return (
    <div className="App">
      {/* Навигация */}
      <HeaderNav />

      {/* Глобальный контекст приложения */}
      <AppContext.Provider value={{ appState, setAppState }}>
        {/* ===== ROUTER =====*/}
        <Routes>
          {/* Главная страница с формой */}
          <Route
            path="/"
            element={
              appState.products && appState.pages ? <FormPage /> : <Loader />
            }
          ></Route>

          {/* Страница со списком задач */}
          <Route
            path="/tasks"
            element={
              appState.products &&
              appState.users &&
              appState.pages && (
                <TablePageContext.Provider>
                  <TablePage />
                </TablePageContext.Provider>
              )
            }
          ></Route>

          {/* Страница редактирования задачи */}
          <Route
            path="/edit/:id"
            element={
              appState.products &&
              appState.users &&
              appState.pages && (
                <EditPageContext.Provider>
                  <EditPage />
                </EditPageContext.Provider>
              )
            }
          ></Route>
        </Routes>
        {/* ===== ROUTER =====*/}
      </AppContext.Provider>
    </div>
  );
};

export default App;
