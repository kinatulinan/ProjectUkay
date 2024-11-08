import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UkayAppBar from './UkayAppBar';
import UkayProducts from './UkayProducts.jsx';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import SellProductPage from './SellProductPage'; // Add this page if you have a component for it
import CartPage from './CartPage';
import RegisterPage from './components/RegisterPage.jsx';
import LoginPage from './components/LoginPage.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <UkayAppBar />
      <br />
      <hr />
      <Routes>
        <Route path="/home" element={<HomePage />} /> {/* Home page route */}
        <Route path="/products" element={<ProductsPage />} /> {/* Products page route */}
        <Route path="/sell" element={<SellProductPage />} />
        <Route path="/cart" element={<CartPage/>} /> {/* Sell a Product page route */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
