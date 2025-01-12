import ButtonDelete from '../ButtonDelete';
import Counter from '../Counter';
import './style.scss';

const Product = ({product, deleteProduct, increase, decrease}) => {
  const { id, title, img, priceTotal, count} = product;
  return ( 
	  <section className="product">
      <div className="product__img">
        <img src={`./img/products/${img}`} alt={title}/>
      </div>
      <div className="product__title">{title}</div>
      <div className="product__count">
        <Counter count = {count} increase={increase} decrease = {decrease} id = {id} />
      </div>

		  <div className="product__price">{priceTotal}</div>

      <div className="product__controls">
        <ButtonDelete deleteProduct = {deleteProduct} id = {id}/>
      </div>
  	</section>
  );
}
 
export default Product;