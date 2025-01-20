import HeaderNav from "../../components/HeaderNav";
import Form from "../../components/Form";

const FormPage = ({products, title}) => {
  return (
    <>
     <HeaderNav/>
      <div className="white-plate white-plate--payment">
        <div className="container-fluid">

          <div className="white-plate__header text-center">
            <p className="white-plate__logo">
              <span>{title.split(' ')[0]}</span>{' ' + title.split(' ')[1]}
            </p>
          </div>

          <div className="white-plate__line-between white-plate__line-between--main"></div>

          <Form products={products}/>

        </div>
      </div>
    </>
  );
}
 
export default FormPage;