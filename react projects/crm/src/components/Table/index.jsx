
import TableRow from '../TableRow';

const Table = () => {
  const tableHeaders = ['ID', 'дата', 'продукт', 'имя', 'email', 'телефон', 'статус', ''];

  return (
    <table className="table fs-14">
      <thead>
        <tr>
          {tableHeaders.map( (header) => {
            return(<th key={header}>{header}</th>);
          })}
        </tr>
      </thead>
      <tbody id="tbody" className="table__body">
        <TableRow></TableRow>
      </tbody>
    </table>
  );
}

export default Table;