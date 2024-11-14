import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UkayAppBar from './UkayAppBar';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import SellProductPage from './SellProductPage';
import CartPage from './CartPage';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import PaymentPage from './PaymentPage';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const handleRemoveItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <UkayAppBar />
      <br />
      <hr />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
        <Route path="/sell" element={<SellProductPage />} />
        <Route 
          path="/cart" 
          element={<CartPage cartItems={cartItems} onRemoveItem={handleRemoveItem} />} 
        />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/list" element={<OrderList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/payment" element={<PaymentPage />} />

      </Routes>
    </Router>
  );
}

export default App;
