import { Routes, Route, useLocation } from "react-router-dom";
import { createContext } from "react";

import useAppState from "../hooks/useAppState";
import { updateFieldValue, clearFieldOnClick, handleBlurValue, btnClicked } from "../utils/useFormHandlers";
import { useBodyClass } from "../hooks/useBodyClass";

import FormPage from "../pages/FormPage";
import HeaderNav from "../components/HeaderNav";
import TablePage from "../pages/Table";
import EditPage from "../pages/Edit";
import Loader from "../components/Loader";
import "./App.css";

export const AppContext = createContext(null);

const App = () => {
	const location = useLocation();
	useBodyClass(location.pathname); // Установим класс для body в зав-ти от текущей страницы
	const {appState, setAppState} = useAppState();

	return (
		<div className="App">
		<HeaderNav />

		<AppContext.Provider
			value={{
				appState,
				setAppState,
				btnClicked,
				clearFieldOnClick,
				updateFieldValue,
				handleBlurValue
			}}
		>

			{appState.loading ? <Loader/> : (
				<Routes>
					<Route
						path="/"
						element={appState.formData && appState.products && appState.pages && <FormPage/>}
					></Route>
					<Route
						path="/tasks"
						element={appState.products && appState.users && appState.pages && <TablePage/>}
					></Route>
					<Route
						path="/edit/:id"
						element={appState.products && appState.users && appState.pages && <EditPage/>}
					></Route>
				</Routes> 
			)}
			
		</AppContext.Provider>
		</div>
	);
};

export default App;
