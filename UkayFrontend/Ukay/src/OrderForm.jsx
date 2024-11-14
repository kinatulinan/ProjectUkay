import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const OrderForm = ({ onOrderSaved }) => {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderDate = new Date().toISOString().split('T')[0]; // Generates the current date in "YYYY-MM-DD" format
    
    const orderData = {
      order_date: orderDate,
      items: cartItems.map((item) => ({
        name: item.sellProductName,
        quantity: 1, // Customize as needed
        price: item.sellProductPrice,
        total: item.sellProductPrice,
      })),
    };

    try {
      const response = await axios.post('/api/order/placeOrder', orderData);
      onOrderSaved(response.data);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <form onSubmit={handleSubmit}>
        <p>Order Date: {new Date().toLocaleDateString()}</p> {/* Displays the current date */}
        <div>
          <h3>Items in Order:</h3>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.sellProductName}</td>
                  <td>1</td>
                  <td>${item.sellProductPrice.toFixed(2)}</td>
                  <td>${item.sellProductPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
