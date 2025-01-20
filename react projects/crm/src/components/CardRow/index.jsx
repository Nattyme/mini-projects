const CardRow = ({label, children, id=null}) => {
return (
	<div className="row mb-3">
		<div className="col-md-2">
			<strong>{label}</strong>
		</div>
		<div className="col" id={id}>
			{children}
		</div>
	</div>
);
}

export default CardRow;