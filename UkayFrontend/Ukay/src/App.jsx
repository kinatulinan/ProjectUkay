import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import UkayAppBar from './UkayAppBar';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import SellProductPage from './SellProductPage';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import PaymentPage from './PaymentPage';
import Cart from './Cart';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.sellId === product.sellId);
      if (existingProduct) {
        return prevItems.map(item =>
          item.sellId === product.sellId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = quantity;
      return updatedItems;
    });
  };

  return (
    <Router>
      <UkayAppBar
        onCartClick={() => setCartOpen(true)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
        <Route path="/sell" element={<SellProductPage />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity}/>} />
        <Route path="/list" element={<OrderList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
