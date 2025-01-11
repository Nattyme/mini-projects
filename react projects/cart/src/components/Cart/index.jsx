import { useState } from 'react';
import CartHeader from '../CartHeader';
import Product from '../Product';
import CartFooter from '../CartFooter';
import data from './../../data/data.json';

const Cart = () => {
  const [cart, setCart] = useState(data);
  const products = cart.map((product) => {
    return  <Product product = {product} />
  });
  
	return ( 
		<section className="cart">
      
			<CartHeader />
        {products}
      <CartFooter />

		</section>
	);
}

export default Cart;