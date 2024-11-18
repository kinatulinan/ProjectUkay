import React, { useEffect, useState } from 'react';
import { placeOrder as placeOrderService, fetchOrders as fetchOrdersService, deleteOrder as deleteOrderService } from '../orderService';
import './Orders.css';

const OrderForm = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        order_date: '',
        quantity: 0,
        price: 0,
        total: 0
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetchOrdersService();
                setOrders(response);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const calculateTotal = (quantity, price) => quantity * price;

    const handleInputChange = (field, value) => {
        const updatedOrder = {
            ...newOrder,
            [field]: value,
            total: calculateTotal(
                field === 'quantity' ? value : newOrder.quantity,
                field === 'price' ? value : newOrder.price
            )
        };
        setNewOrder(updatedOrder);
    };

    const placeOrder = async () => {
        if (!newOrder.order_date || newOrder.quantity <= 0 || newOrder.price <= 0) {
            alert('Please fill in all fields correctly.');
            return;
        }
        try {
            const response = await placeOrderService(newOrder);
            if (response) {
                setOrders((prevOrders) => [...prevOrders, response]);
            }
            resetForm();
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    const deleteOrder = async (orderIndex) => {
        const orderId = orders[orderIndex].orderId;
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await deleteOrderService(orderId);
                setOrders((prevOrders) => prevOrders.filter((_, index) => index !== orderIndex));
                alert('Order deleted successfully.');
            } catch (error) {
                console.error('Error deleting order:', error);
                alert('Failed to delete order. Please try again.');
            }
        }
    };

    const resetForm = () => {
        setNewOrder({ order_date: '', quantity: 0, price: 0, total: 0 });
    };

    return (
        <div className="orders-container">
            <h1 className="orders-header">Orders</h1>
            <div className="order-form-container">
                <h2 className="form-title">Place a New Order</h2>
                <div className="form-fields">
                    <label>
                        Order Date:
                        <input
                            type="text"
                            value={newOrder.order_date}
                            placeholder="yyyy-mm-dd"
                            onChange={(e) => handleInputChange('order_date', e.target.value)}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            value={newOrder.quantity}
                            onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="text"
                            value={newOrder.price}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || !isNaN(value) && !isNaN(parseFloat(value))) {
                                    handleInputChange('price', value);
                                }
                            }}
                        />
                    </label>
                    <button className="place-order-button" onClick={placeOrder}>
                        Place Order
                    </button>
                </div>
            </div>

            <h2 className="order-list-title">Order List</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order Date</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.order_date}</td>
                            <td>{order.quantity}</td>
                            <td>${order.price}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteOrder(index)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderForm;