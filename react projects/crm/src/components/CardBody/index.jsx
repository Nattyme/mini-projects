import { useContext, useEffect } from 'react';
import { AppContext } from './../../App/App';
import {EditPageContext} from '../../pages/Edit';
import Input from "../../components/Input";
import Select from "../../components/Select";
import CardRow from "../CardRow";

const CardBody = () => {
  const {appState, setAppState, navData} = useContext(AppContext);
  const {id} = useContext(EditPageContext);
  
  const editTask = appState.data.find((task) => task.id === +id);
  console.log(editTask);
  
  useEffect(()=> {
    setAppState((prevState) => ({
      ...prevState,
      initialFormData : {
        ...editTask
      }
    }
  ));
  },[])
  console.log(appState);
  
	const data = [
		{
			label : 'ID',
			content: (
				<>
					Заявка №<span id="number">1</span>
					<Input type="hidden" name="id" placeholder={`${editTask.id}`} id="id" value="" required={false}/>
				</>
			)
		},
		{
			label : 'Дата создания:',
			content: editTask.timestamp
		},
		{
			label : "Продукт:",
			content: (
				<Select
					name="product"
					className="custom-select"
          value={`${editTask.product}`}
					options={appState.products}
					id="product"
				/>
			)
		},
		{
			label : "Имя:",
			content: (
				<Input
					type="text"
					name="full_name"
					placeholder="Введите имя"
					id="full_name"
					value={`${editTask.full_name}`}
					required={true}
					className="form-control"
				/>
			)
		},
		{
			label : "Email:",
			content: (
				<Input
					type="text"
					name="email"
					placeholder="Введите email"
					id="email"
					value={`${editTask.email}`}
					required={true}
					className="form-control"
				/>
			)
		},
		{
			label : "Телефон:",
			content: (
				<Input
					type="text"
					name="phone"
					placeholder="phone"
					id="phone"
					className="form-control"
					value={`${editTask.phone}`}
				/>
			)
		},
		{
			label : "Статус заявки:",
			content: (
				<Select
					name="status"
					className="custom-select"
					options={navData}
          placeholder="Выберите статус"
					id="status"
					value={`${editTask.status}`}
				/>
			)
		},
	];

	return (
		<div className="card-body">
			{appState.products && navData && data.map((field)=>{
				return (
					<CardRow key={field.label} label={field.label}>
						{field.content}
					</CardRow>
				);
				
			})}		
		</div>
	);
}

export default CardBody;