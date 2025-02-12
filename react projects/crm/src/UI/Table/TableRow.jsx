const TableRow = ({ key, dataStatus, classNames, children }) => {
 
  return (
    <tr
      key={key}
      className={'table__row' + classNames}
      data-status={dataStatus}
    >
      {{children}}
    </tr>
  );
};

export default TableRow;

