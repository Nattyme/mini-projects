import { useState, useEffect } from 'react';
import CartHeader from '../CartHeader';
import Product from '../Product';
import CartFooter from '../CartFooter';
import data from './../../data/data.json';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(null);
  const [fetchData, setFetchData] = useState(true);

  useEffect( () => {
    fetch('http://localhost:8000/products').then((res) => {return res.json()}).then((data) => {
      setCart(data);
    });
  }, [fetchData]);

  useEffect ( () => {
    if (cart) {
      setTotal({
        price: cart.reduce((prev, curr) => {return +prev + Number(curr.priceTotal)}, 0),
        count: cart.reduce( (prev, curr) => {return +prev + Number(curr.count)}, 0)
      })
    }
  
  }, [cart])

  const increase = (id) => {
    const product = cart.find( product => product.id === id);
    console.log(product);

    const data = {
      ...product,
      count:  Number(product.count) + 1,
      priceTotal :  (Number(product.count) + 1) * product.price
    };

    fetch('http://localhost:8000/products/' + id, {
      method: 'PUT',
      headers: {'Content-Type' : 'appliction/json'},
      body: JSON.stringify(data)
    }).then((res) => {
      res.ok &&  setFetchData( value => !value);
    });
 
  }

  const decrease = (id) => {
    const product = cart.find(product => product.id === id);
    const newCount = Number(product.count) - 1 > 0 ? Number(product.count) - 1 : 1;
    const data = {
      ...product,
      count: newCount,
      priceTotal : newCount * product.price  
    }
    
    fetch('http://localhost:8000/products/' + id, {
      method: 'PUT',
      headers : {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    }).then((res) => {
      res.ok &&  setFetchData( value => !value);
    });
 ;
   
    // setCart((cart)=> {
    //   return cart.map((product)=>{
    //     if (product.id === id) {
    //       const newCount = Number(product.count) - 1 > 0 ? Number(product.count) - 1 : 1;
    //       return {
    //         ...product,
    //         count: newCount,
    //         priceTotal : newCount * product.price
    //       }
    //     }
    //     return product;    
    //   });
    // });
  }

  const deleteProduct = (id) => {
    // setCart( (cart) => cart.filter( (product) => id !== product.id));

    fetch('http://localhost:8000/products/' + id, {
      method: 'DELETE'
    }).then((res) => {
      res.ok &&  setFetchData( value => !value);
    })
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

	return ( 
		<section className="cart">
      
			<CartHeader />
        {cart &&
          cart.map((product) => {
            return  <Product 
                      product = {product} 
                      key = {product.id} 
                      deleteProduct = {deleteProduct} 
                      increase={increase} 
                      decrease={decrease}
                      changeValue = {changeValue}
                    />
          })
        }
      {total && <CartFooter total = {total}/>}

		</section>
	);
}

export default Cart;