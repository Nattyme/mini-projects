import { useState } from 'react';
import TableRow from '../TableRow';
import data from './../../data/data.json';

const Table = ({tableHeaders}) => {
  // const [fetch, setFetchData] = useState(true);
  // fetch('http://localhost:8000/testData', {
  //   method: 'PUT',
  //   headers: {'Content-Type' : 'application/json'},

  // });

  const fieldsData = data;
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
        <TableRow data={fieldsData}></TableRow>
      </tbody>
    </table>
  );
}

export default Table;