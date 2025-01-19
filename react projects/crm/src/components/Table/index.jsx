const Table = ({tableHeaders}) => {
 
	return (
		<table className="table fs-14">
			<thead>
				<tr>
          {tableHeaders.map( (header) => {
            return(<th>{header}</th>);
          })}
				</tr>
			</thead>
			<tbody id="tbody" className="table__body"></tbody>
		</table>
	);
}

export default Table;