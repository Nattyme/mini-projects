import { useState, useEffect } from 'react';
import CartHeader from '../CartHeader';
import Product from '../Product';
import CartFooter from '../CartFooter';

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
  
  }, [cart]);
  
  const updateProductData = (id, data) => {
    fetch('http://localhost:8000/products/' + id, {
      method: 'PUT',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
    }).then((res) => {
      res.ok &&  setFetchData( value => !value);
    });
  }

  const changeInputQuantity = (id, inputAction, value = 1) => {
    const product = cart.find( product => product.id === id);
    let newCount = product.count;

    if (inputAction === 'increase') {
      newCount = Number(product.count) + 1;
    }

    if (inputAction === 'decrease') {
      newCount = Number(product.count) - 1 > 0 ? Number(product.count) - 1 : 1;
    }

    if ( inputAction === 'manualValue') {
      newCount = value;
    }

    const data = {
          ...product,
          count: newCount,
          priceTotal : newCount * product.price  
    };

    updateProductData(id, data);
  }

  const clickedInputTarget = (id, e, value='1') => {
    const inputAction = e.target.dataset.btn;
    if (inputAction && (inputAction === 'increase' || inputAction === 'decrease') ) {
      return changeInputQuantity(id, inputAction);
    }

    if (inputAction && inputAction === 'manualValue') {
      return changeInputQuantity(id, inputAction, value);
    }
  }


  const changeValue = (id, value) => {
    const product = cart.find(product => product.id === id);
    const data = {
      ...product,
      count: value,
      priceTotal: value * product.price
    }

    updateProductData(id, data);
 
  }

  const deleteProduct = (id) => {
    // setCart( (cart) => cart.filter( (product) => id !== product.id));

    fetch('http://localhost:8000/products/' + id, {
      method: 'DELETE'
    }).then((res) => {
      res.ok &&  setFetchData( value => !value);
    })
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
                      changeValue = {changeValue}
                      clickedInputTarget = {clickedInputTarget}
                    />
          })
        }
      {total && <CartFooter total = {total}/>}

		</section>
	);
}

export default Cart;