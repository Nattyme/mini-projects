import ButtonDelete from '../ButtonDelete';
import Counter from '../Counter';
import './style.scss';

const Product = ({product, deleteProduct}) => {
  const { id, title, img, price, count} = product;
  return ( 
	  <section className="product">
      <div className="product__img">
        <img src={`./img/products/${img}`} alt={title}/>
      </div>
      <div className="product__title">{title}</div>
      <div className="product__count">
        {/* <Counter /> */}
      </div>

		  <div className="product__price">{price}</div>

      <div className="product__controls">
        <ButtonDelete deleteProduct = {deleteProduct} id = {id}/>
      </div>
  	</section>
  );
}
 
export default Product;