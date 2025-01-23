import { useState, useEffect, createContext } from 'react';
import {serverPath} from './../../helpers/variables';
import Product from '../Product';
import Button from './../Button';
import CartHeader from './CartHeader';
import CartFooter from './CartFooter';
import getRandomValue from './../../utils/calcValues';
import './style.scss';  

export const AppContext = createContext(null);

/**
 * Компонент корзины товаров.
 * 
 * @component
 * @returns {JSX.Element} Отображает корзину с товарами, их количеством и общей стоимостью.
 * 
 * @description
 * - Использует состояние для хранения данных корзины, общей суммы и триггера для обновления данных.
 * - Подгружает данные о продуктах с сервера при первом рендере и обновлении корзины.
 * - Предоставляет функции для добавления, удаления и изменения количества продуктов.
 * - Рендерит список продуктов с возможностью взаимодействия.
 * 
 * @context {Object} AppContext
 * - `deleteProduct` - Функция для удаления товара из корзины.
 * - `updateInputValue` - Функция для изменения количества товара.
 * - `clickedInputTarget` - Обработчик для кликов по кнопкам изменения количества товара.
 * - `addProduct` - Функция для добавления нового случайного продукта в корзину.
 * 
 * @state {Array|null} cart - Список товаров в корзине.
 * @state {Object|null} total - Общая сумма и количество товаров в корзине.
 * @state {boolean} fetchData - Флаг для триггера обновления данных корзины.
 * @state {boolean} isCartEmpty - Флаг для проверки пустоты корзины.
 * 
 * @dependencies
 * - Компоненты: `Product`, `CartHeader`, `CartFooter`, `Button`.
 * - Контекст: `AppContext`.
 * 
 * @example
 * <Cart />
*/

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(null);
  const [fetch, setFetchData] = useState(true);
  const isCartEmpty = !cart || cart.length === 0 ? true : false;

  useEffect ( () => {
    if (cart) {
      setTotal({
        price: cart.reduce((prev, curr) => {return +prev + Number(curr.priceTotal)}, 0),
        count: cart.reduce( (prev, curr) => {return +prev + Number(curr.count)}, 0)
      })
    }
  
  }, [cart]);
  
  const updateProductData = (newData, action, id) => {
    const url = id ? `${serverPath}products/${id}` : `${serverPath}products`;
  
    fetch( url, {
      method: action,
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(newData)
    }).then((res) => {
      res.ok &&  setFetchData( value => !value);
    })
  }

  const clickedInputTarget = (id, e) => {
    const inputAction = e.target.dataset.btn;

    if (inputAction && (inputAction === 'increase' || inputAction === 'decrease') ) {
      return updateInputValue(id, inputAction);
    }
  }

  const updateInputValue = (id, inputAction, value) => {
    const product = cart.find( product => product.id === id);
    let newCount = product.count;
   
    if (inputAction === 'increase') {
      newCount = Number(product.count) + 1;
    }

    if (inputAction === 'decrease') {
      newCount = Number(product.count) - 1 > 0 ? Number(product.count) - 1 : 1;
    }

    if ( inputAction === 'manualValue') {
      newCount = Math.max(value, 1);
    }

    const data = {
      ...product,
      count: newCount,
      priceTotal : newCount * product.price  
    };

    updateProductData(data, 'PUT', id);
  }

  const addProduct = async () => {
    try {
      const response = await fetch(serverPath + 'randomProduct');

      if(!response.ok) {
        throw new Error ('Данные для случайного продукта не получены с сервера')
      }


      const randomProduct = await response.json();
      const price = getRandomValue(randomProduct.prices);
      const data = {
        img: getRandomValue(randomProduct.images),
        title: getRandomValue(randomProduct.titles),
        count: 1,
        price: price,
        priceTotal: price
      }

      updateProductData(data, 'POST');
    }

    catch {
      console.log('random product data is not received');
    }
  }

  const deleteProduct = (id) => {
    fetch(serverPath + 'products/' + id, {
      method: 'DELETE'
    }).then((res) => {
      res.ok &&  setFetchData( value => !value);
    })
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
    <AppContext.Provider value = {{deleteProduct, updateInputValue, clickedInputTarget, addProduct}}>
      <section className="cart">
        {!isCartEmpty && <CartHeader/>}

        {cart && renderProducts()}
        {!isCartEmpty && total && <CartFooter  total = {total}/>}
      </section>
      <section className="button-wrapper">
        <Button title = 'Добавить товар' onclick={addProduct}/>
      </section>
    </AppContext.Provider>
	);
}

export default Cart;