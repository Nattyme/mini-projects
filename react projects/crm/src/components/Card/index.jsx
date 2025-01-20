import CardBody from "../CardBody";
import CardHeader from "../CardHeader";

const Card = ({products, statusData}) => {
  return (
    <div className="card mb-4">
      <CardHeader text="Данные о заявке"/>
      <CardBody products={products} statusData = {statusData}/>
    </div>
  );
}
 
export default Card;