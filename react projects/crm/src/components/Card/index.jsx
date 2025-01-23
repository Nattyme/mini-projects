import CardBody from "../CardBody";
import CardHeader from "../CardHeader";

const Card = () => {
  return (
    <div className="card mb-4">
      <CardHeader text="Данные о заявке"/>
      <CardBody/>
    </div>
  );
}
 
export default Card;