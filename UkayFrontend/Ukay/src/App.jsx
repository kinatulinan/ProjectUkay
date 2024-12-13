import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import UkayAppBar from './UkayAppBar';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import SellProductPage from './SellProductPage';
import OrderPage from './OrderPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import PaymentPage from './PaymentPage';
import Cart from './Cart';
import TransactionPage from './TransactionPage';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.name === product.name); // Check by name
      if (existingProduct) {
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }]; // Ensure name is included
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

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userDetails');
    localStorage.removeItem('cartItems');
    // Redirect to the login page
    navigate('/login');
};
  

  return (
    <Router>
      <UkayAppBar
        onCartClick={() => setCartOpen(true)}
        cartItems={cartItems}
        handleLogout={handleLogout}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage onAddToCart={handleAddToCart} />} />

        <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
        <Route path="/sell" element={<SellProductPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/transactions" element={<TransactionPage />} />

      </Routes>
    </Router>
  );
}

export default App;
