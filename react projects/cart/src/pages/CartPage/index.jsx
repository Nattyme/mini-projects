import Title from '../../components/Title';
import Cart from '../../components/Cart';
import './style.scss';

const CartPage = () => {
	return ( 	
		<section className="section-cart">
			<header className="section-cart__header">
				<div className="container">
					<Title/>
				</div>
			</header>
			<div className="section-cart__body">
			<div className="container">
				<Cart/>
			</div>
			</div>
		</section> 
	);
}

export default CartPage;