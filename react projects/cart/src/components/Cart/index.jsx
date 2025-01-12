import { useState } from 'react';
import CartHeader from '../CartHeader';
import Product from '../Product';
import CartFooter from '../CartFooter';
import data from './../../data/data.json';

const Cart = () => {
  const [cart, setCart] = useState(data);

  const increase = (id) => {
   
    setCart((cart)=> {
      return cart.map((product)=>{
        if (product.id === id) {
          const newCount = Number(product.count) + 1;
          return {
            ...product,
            count: newCount,
            priceTotal : newCount * product.price
          }
        }
        return product;    
      });
    });
  }

  const decrease = (id) => {
   
    setCart((cart)=> {
      return cart.map((product)=>{
        if (product.id === id) {
          const newCount = Number(product.count) - 1 > 0 ? Number(product.count) - 1 : 1;
          return {
            ...product,
            count: newCount,
            priceTotal : newCount * product.price
          }
        }
        return product;    
      });
    });
  }

  const deleteProduct = (id) => {
    setCart( (cart) => cart.filter( (product) => id !== product.id));
  }

  const changeValue = (id, value) => {
    setCart( (cart) => {
      return cart.map( (product) => {
        if (product.id === id) {
          return {
            ...product,
            count: value,
            priceTotal : value * product.price
          }
        }
        return product
      })
    });
  }

  const products = cart.map((product) => {
    return  <Product 
              product = {product} 
              key = {product.id} 
              deleteProduct = {deleteProduct} 
              increase={increase} 
              decrease={decrease}
              changeValue = {changeValue}
            />
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