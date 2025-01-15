import { useState, useEffect, createContext } from 'react';
import CartHeader from '../CartHeader';
import Product from '../Product';
import CartFooter from '../CartFooter';
import Button from './../Button';

export const AppContext = createContext(null);

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
    console.log(product);
    
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
    const inputValue = value > 0 ? value : 1;
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

  const addProduct = () => {
    const titles = ['Apple MacBook Air 13', 'Apple watch', 'Apple MacBook Air 13'];
    const images = ['macbook.jpg', 'apple-watch.jpg','mac-pro.jpg'];
    const prices = [1000, 19000, 9000, 25000];

    const getRandomValue = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    }

    const price = getRandomValue(prices);
  
    const data = {
      img: getRandomValue(images),
      title: getRandomValue(titles),
      count: 1,
      price: price,
      priceTotal: price
    }

    updateProductData(data, 'POST');
  }

	return ( 
    <AppContext.Provider value = {{deleteProduct}}>
      <section className="cart">
        <CartHeader />
          {cart &&
            cart.map((product) => {
              return  <Product 
                        product = {product} 
                        key = {product.id} 
                        changeValue = {changeValue}
                        clickedInputTarget = {clickedInputTarget}
                      />
            })
          }
        {total && <CartFooter total = {total}/>}

      </section>
      <section className="button-wrapper">
        <Button title = 'Add product' onClick={addProduct}/>
      </section>
    </AppContext.Provider>
	);
}

export default Cart;