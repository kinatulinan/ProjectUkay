import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UkayAppBar from './UkayAppBar';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import SellProductPage from './SellProductPage';
import CartPage from './CartPage';

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Function to remove an item from the cart
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
      </Routes>
    </Router>
  );
}

export default App;
