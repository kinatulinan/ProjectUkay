import React, { useState, useEffect } from 'react';
import './App.css'; 
import PaymentService from '../PaymentService';

// PaymentForm component
const PaymentForm = ({ userid, onPaymentCreated }) => {
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [notes, setNotes] = useState('');
    const [method, setMethod] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const paymentData = {
            amount: parseFloat(amount),
            paymentDate,
            transactionId,
            notes,
            method
        };

        try {
            await PaymentService.createPayment(userid, paymentData);
            alert('Payment created successfully!');
            onPaymentCreated();
        } catch (error) {
            alert('Error creating payment. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Payment Date:</label>
                <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Order ID:</label>
                <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                />
            </div>
            <div>
                <label>Notes:</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <div>
                <label>Payment Method:</label>
                <select value={method} onChange={(e) => setMethod(e.target.value)} required>
                    <option value="">Select method</option>
                    <option value="CASH">Cash</option>
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="PAYPAL">PayPal</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="MOBILE_PAYMENT">Mobile Payment</option>
                    <option value="GIFT_CARD">Gift Card</option>
                    <option value="STORE_CREDIT">Store Credit</option>
                    <option value="CHECK">Check</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>
            <button type="submit">Save Payment</button>
        </form>
    );
};

// PaymentList component
const PaymentList = ({ payments, searchId }) => {
    const filteredPayments = searchId
        ? payments.filter(payment => payment.transactionId.toLowerCase().includes(searchId.toLowerCase()))
        : payments;

    return (
        <ul>
            {filteredPayments.length > 0 ? (
                filteredPayments.map(payment => (
                    <li key={payment.paymentid}>
                        Amount: {payment.amount}, Date: {payment.paymentDate}, Method: {payment.method}, Order ID: {payment.transactionId}, Notes: {payment.notes}
                    </li>
                ))
            ) : (
                <li>No payments found.</li>
            )}
        </ul>
    );
};

// Main PaymentPage component
const PaymentPage = () => {
    const userid = 1; // Sample user ID
    const [payments, setPayments] = useState([]);
    const [searchId, setSearchId] = useState('');

    const fetchPayments = async () => {
        try {
            const response = await PaymentService.getPaymentsByUserId(userid);
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };
      

    useEffect(() => {
        fetchPayments();
    }, [userid]);

    const handlePaymentCreated = () => {
        fetchPayments(); 
    };

    return (
        <div className="container">
            <h1>Create Payment</h1>
            <PaymentForm userid={userid} onPaymentCreated={handlePaymentCreated} />
            <div style={{ marginTop: '20px' }}>
                <h2>Your Payments</h2>
                <div>
                    <label>Search by Order ID:</label>
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter Transaction ID"
                    />
                </div>
                <PaymentList payments={payments} searchId={searchId} />
            </div>
        </div>
    );
};

export default PaymentPage;
