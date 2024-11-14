import axios from 'axios';

const API_URL = 'http://localhost:8080/payments';

const createPayment = async (userid, paymentData) => {
    const response = await axios.post(`${API_URL}/savePayment/${userid}`, paymentData);
    return response;
};

const getPaymentsByUserId = async (userid, paymentData) => {
    const response = await axios.get(`${API_URL}/showPayment/${userid}`, paymentData);
    return response;
};

const PaymentService = {
    createPayment,
    getPaymentsByUserId,
};

export default PaymentService;