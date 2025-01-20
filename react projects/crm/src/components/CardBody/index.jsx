import Input from "../../components/Input";
import Select from "../../components/Select";
import CardRow from "../CardRow";

const CardBody = ({products, statusData}) => {
	const data = [
		{
			label : 'ID',
			content: (
				<>
					Заявка №<span id="number">1</span>
					<Input type="hidden" name="id" placeholder="" id="id" value="" required={false}/>
				</>
			)
		},
		{
			label : 'Дата создания:',
			content: '2020-04-20 13:52:130'
		},
		{
			label : "Продукт:",
			content: (
				<Select
					name="product"
					className="custom-select"
					options={products}
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
					value="Петр Сергеевич"
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
					value="info@inbox.ru"
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
					value="+7 (903) 555-77-55"
				/>
			)
		},
		{
			label : "Статус заявки:",
			content: (
				<Select
					name="status"
					className="custom-select"
					options={statusData}
					id="status"
					value="Выберите статус"
				/>
			)
		},
	];

	return (
		<div className="card-body">
			{data.map((field)=>{
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