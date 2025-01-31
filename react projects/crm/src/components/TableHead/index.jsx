const TableHead = ({headers}) => {

return (
	<thead>
		<tr>
			{headers.map( (header) => {
			return(<th key={header}>{header}</th>);
			})}
		</tr>
	</thead>
);
}

export default TableHead;