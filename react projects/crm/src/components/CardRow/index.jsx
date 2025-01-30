const CardRow = ({label, children}) => {

  return (
    <div className="row mb-3">
      <div className="col-md-2">
        <strong>{label}</strong>
      </div>
      <div className="col">
        {children}
      </div>
    </div>
  );
}

export default CardRow;