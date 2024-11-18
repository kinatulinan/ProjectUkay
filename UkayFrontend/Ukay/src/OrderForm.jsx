import React, { useEffect, useState } from 'react';
import { placeOrder as placeOrderService, fetchOrders as fetchOrdersService, deleteOrder as deleteOrderService } from '../orderService';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

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
        <Box sx={{ padding: 2, marginTop: '0px'  }}>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    marginBottom: 2,
                    textAlign: 'left',
                }}
            >
                Orders
            </Typography>

            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    Place a New Order
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Order Date"
                        value={newOrder.order_date}
                        placeholder="yyyy-mm-dd"
                        onChange={(e) => handleInputChange('order_date', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={newOrder.quantity}
                        onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                        fullWidth
                    />
                    <TextField
                        label="Price"
                        value={newOrder.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                        onClick={placeOrder}
                    >
                        Place Order
                    </Button>
                </Box>
            </Box>

            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Order List
            </Typography>
            <Box sx={{ overflowY: 'auto', maxHeight: 400 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', fontWeight: 'bold', borderBottom: '1px solid #ddd', padding: 1 }}>
                    <Typography textAlign="center">Order Date</Typography>
                    <Typography textAlign="center">Quantity</Typography>
                    <Typography textAlign="center">Price</Typography>
                    <Typography textAlign="center">Total</Typography>
                </Box>
                {orders.map((order, index) => (
                    <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', borderBottom: '1px solid #ddd', padding: 1 }}>
                        <Typography textAlign="center">{order.order_date}</Typography>
                        <Typography textAlign="center">{order.quantity}</Typography>
                        <Typography textAlign="center">${order.price}</Typography>
                        <Typography textAlign="center">${order.total.toFixed(2)}</Typography>
                        <IconButton
                            sx={{ color: 'red' }}
                            onClick={() => deleteOrder(index)}
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default OrderForm;
