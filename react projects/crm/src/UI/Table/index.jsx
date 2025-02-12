const Table = ({ classNames, children}) => {
  return (
    <table className={'table' + classNames}>{{children}}</table>
  );
}

export default Table;