import { useContext } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import CardRow from "../CardRow";
import { AppContext } from "./../../App/App";


const CardBody = ({editTask, register}) => {
  const {appState, setAppState} = useContext(AppContext);


	const formFields = [
		{
			label : 'ID',
			content: (
				<>
					Заявка №<span id="number">{editTask.id}</span>
					<Input type="hidden" name="id" placeholder={`${editTask.id}`} id="id" value="" required={false} register={register}/>
				</>
			)
		},
		{
			label : 'Дата создания:',
			content: editTask.date
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
          register={register}
          // onChange={(e) => {onChangedSelect(e, setAppState)}}
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
					className="form-control"
					required={true}
          register={register}
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
					className="form-control"
					required={true}
          register={register}
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
          required={true}
          register={register}
				/>
			)
		},
		{
			label : "Статус заявки:",
			content: (
				<Select
					name="status"
					className="custom-select"
					options={appState.navData.filter((status) => status.value !== 'all')}
          placeholder="Выберите статус"
					id="status"
					value={`${editTask.status}`}
          register={register}
          defaultOption="Выберите статус"
          // onChange={(e) => {onChangedSelect(e, setAppState)}}
				/>
			)
		},
	];

	return (
		<div className="card-body">
			{appState.products && appState.navData && formFields.map((field)=>{
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