import ButtonDelete from '../ButtonDelete';
import Counter from '../Counter';
import formatPrice from './../../utils/priceFormatter';
import './style.scss';

const Product = ({product, changeValue, clickedInputTarget}) => {
  const { id, title, img, priceTotal, count} = product;

  return ( 
	  <section className="product">
      <div className="product__img">
        <img src={`./img/products/${img}`} alt={title}/>
      </div>
      <div className="product__title">{title}</div>
      <div className="product__count">
        <Counter count = {count} id = {id} changeValue = {changeValue} clickedInputTarget = {clickedInputTarget} />
      </div>

		  <div className="product__price">
        {formatPrice(priceTotal)} руб.
      </div>

      <div className="product__controls">
        <ButtonDelete id = {id}/>
      </div>
  	</section>
  );
}
 
export default Product;