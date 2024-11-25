import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/cart';

export const getCartItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/showCart`);
  return response.data;
};

export const addCartItem = async (item) => {
  const response = await axios.post(`${API_BASE_URL}/postCart`, item);
  return response.data;
};

export const updateCartItem = async (cartId, updatedItem) => {
  const response = await axios.put(`${API_BASE_URL}/editCartDetails?cartId=${cartId}`, updatedItem);
  return response.data;
};

export const deleteCartItem = async (cartId) => {
  const response = await axios.delete(`${API_BASE_URL}/deleteCart/${cartId}`);
  return response.data;
};
