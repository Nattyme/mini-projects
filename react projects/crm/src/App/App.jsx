import { Routes, Route, useLocation } from "react-router-dom";
import { createContext } from "react";

import { serverPath } from "../helpers/variables";
import useAppState from "../hooks/useAppState";
import { createNewTask } from "../utils/taskUtils";
import { useFormHandlers } from "../hooks/useFormHandlers";
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
	const navData = appState.status; // Пеоедаём данные для навигации

	// Получаем функции для работы с формой
	const {updateFieldValue, clearFieldOnClick, handleBlurValue} = useFormHandlers(appState, setAppState);

	const btnClicked = async (e) => {
		if (e.target.dataset.btn !== "submit") return;

		e.preventDefault();
		const newTask = createNewTask(appState.formData);

		try {
			const response = await fetch(`${serverPath}data`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newTask)
			});
			
			if (!response.ok) {
				console.log('Не получены задачи с сервера');	
				return;
			}

			const newTaskData = await response.json();

			setAppState((prevState) => ({
				...prevState,
				data: [...prevState.data, newTaskData]
			}))
		}
		catch (error) {
			console.log(`Ошибка при сохранении новой задачи: ${error}`);
		}
		
	};


	
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
				handleBlurValue,
				navData,
			}}
		>

			{appState.loading ? <Loader/> : (
				<Routes>
					<Route
						path="/"
						element={appState.formData && appState.products && <FormPage title="Форма заявок" />}
					></Route>
					<Route
						path="/tasks"
						element={appState.products && appState.users && <TablePage title="Все заявки" />}
					></Route>
					<Route
						path="/edit/:id"
						element={<EditPage title="Работа с заявкой :id" />}
					></Route>
				</Routes> 
			)}
			
		</AppContext.Provider>
		</div>
	);
};

export default App;
