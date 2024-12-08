import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderForm from './OrderForm';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/order/showAllOrders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      
      await axios.delete(`/api/order/deleteOrder/${orderId}`);
      setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleOrderSaved = (savedOrder) => {
    fetchOrders();
    setEditingOrder(null);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <OrderForm onOrderSaved={handleOrderSaved} existingOrder={editingOrder} />
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            <span>Date: {order.order_date} | Quantity: {order.quantity} | Price: {order.price} | Total: {order.total}</span>
            <button onClick={() => setEditingOrder(order)}>Edit</button>
            <button onClick={() => deleteOrder(order.orderId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
