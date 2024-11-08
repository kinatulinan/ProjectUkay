import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ onOrderSaved, existingOrder }) => {
  const [order, setOrder] = useState({
    order_date: existingOrder?.order_date || '',
    quantity: existingOrder?.quantity || '',
    price: existingOrder?.price || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = existingOrder
        ? await axios.put(`/api/order/editOrderDetails?orderId=${existingOrder.orderId}`, order)
        : await axios.post('/api/order/placeOrder', order);
      onOrderSaved(response.data);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="order_date"
        placeholder="Order Date"
        value={order.order_date}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={order.quantity}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={order.price}
        onChange={handleInputChange}
      />
      <button type="submit">{existingOrder ? 'Update Order' : 'Place Order'}</button>
    </form>
  );
};

export default OrderForm;
