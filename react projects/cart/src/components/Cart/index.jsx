import { useState, useEffect, createContext } from 'react';
import Product from '../Product';
import Button from './../Button';
import CartHeader from './CartHeader';
import CartFooter from './CartFooter';
import './style.scss';  

export const AppContext = createContext(null);

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(null);
  const [fetchData, setFetchData] = useState(true);
  const isCartEmpty = !cart || cart.length === 0 ? true : false;

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
  
  const updateProductData = (newData, action, id) => {
    const url = id ? 'http://localhost:8000/products/' + id : 'http://localhost:8000/products/';
  
    fetch( url, {
      method: action,
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(newData)
    }).then((res) => {
      res.ok &&  setFetchData( value => !value);
    })
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

    updateProductData(data, 'PUT', id);
  }

  const clickedInputTarget = (id, e, value = 1) => {
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
    const inputValue = Math.max(value, 1);
    const data = {
      ...product,
      count: inputValue,
      priceTotal: inputValue * product.price
    }

    updateProductData(data, 'PUT', id);
  }

  const deleteProduct = (id) => {
    fetch('http://localhost:8000/products/' + id, {
      method: 'DELETE'
    }).then((res) => {
      res.ok &&  setFetchData( value => !value);
    })
  }

  const addProduct = async () => {
    try {
      const response = await fetch('http://localhost:8000/randomProduct');
      console.log(response)
      const randomProduct = await response.json();
    }
    catch {
      console.log('random product not received');
      
    }
   

    // const getRandomValue = (array) => {
    //   return array[Math.floor(Math.random() * array.length)];
    // }

    // const price = getRandomValue(randomProduct.prices);
  
    // const data = {
    //   img: getRandomValue(randomProduct.images),
    //   title: getRandomValue(randomProduct.titles),
    //   count: 1,
    //   price: price,
    //   priceTotal: price
    // }

    // updateProductData(data, 'POST');
  }

  const renderProducts = () => {
    if (isCartEmpty) {
      return <p className="cart__header">Ваша корзина пуста. Добавьте товары</p>
    }
    return cart.map((product) => {
        return  <Product 
                  product = {product} 
                  key = {product.id} 
                />
    })
  }

	return ( 
    <AppContext.Provider value = {{deleteProduct, changeValue, clickedInputTarget, addProduct}}>
      <section className="cart">
        {!isCartEmpty && <CartHeader/>}

        {cart && renderProducts()}
        {!isCartEmpty && total && <CartFooter  total = {total}/>}
      </section>
      <section className="button-wrapper">
        <Button title = 'Add product'/>
      </section>
    </AppContext.Provider>
	);
}

export default Cart;