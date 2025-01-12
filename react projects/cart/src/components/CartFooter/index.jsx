import './style.scss';

const CartFooter = ({ total }) => {
  const {count, price} = total;
	return ( 
		<footer className="cart-footer">
			<div className="cart-footer__count">{count} единицы</div>
			<div className="cart-footer__price">{price} руб.</div>
		</footer>

	);
}

export default CartFooter;