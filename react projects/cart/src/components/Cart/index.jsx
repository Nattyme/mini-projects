import { useState } from 'react';
import CartHeader from '../CartHeader';
import Product from '../Product';
import CartFooter from '../CartFooter';
import data from './../../data/data.json';

const Cart = () => {
  const [cart, setCart] = useState(data);

  const deleteProduct = (id) => {
    setCart( (cart) => cart.filter( (product) => id !== product.id));
  }

  const products = cart.map((product) => {
    return  <Product product = {product} key = {product.id} deleteProduct = {deleteProduct} />
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