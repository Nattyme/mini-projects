import ButtonDelete from '../ButtonDelete';
import Counter from '../Counter';
import './style.scss';

const Product = ({product}) => {
  return ( 
	<section className="product">
		<div className="product__img">
			<img src="./img/products/macbook.jpg" alt={product.title}/>
		</div>
		<div className="product__title">{product.title}</div>
		<div className="product__count">
      <Counter />
		</div>

		<div className="product__price">{product.price}</div>

		<div className="product__controls">
      <ButtonDelete />
		</div>
  	</section>
  );
}
 
export default Product;