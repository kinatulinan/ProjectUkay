import axios from 'axios';

const API_URL = 'http://localhost:8080/api/order';

export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/placeOrder`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};

export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/showAllOrders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteOrder/${orderId}`);
        return response.data; 
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error; 
    }
};

