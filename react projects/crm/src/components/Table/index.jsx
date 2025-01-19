const Table = () => {
	return (
		<table className="table fs-14">
			<thead>
				<tr>
				<th>ID</th>
				<th>дата</th>
				<th>продукт</th>
				<th>имя</th>
				<th>email</th>
				<th>телефон</th>
				<th>статус</th>
				<th></th>
				</tr>
			</thead>
			<tbody id="tbody" className="table__body"></tbody>
		</table>
	);
}

export default Table;