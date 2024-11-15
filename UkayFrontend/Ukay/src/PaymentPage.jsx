import React, { useState, useEffect } from 'react';
import './App.css'; 
import PaymentService from '../PaymentService';

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
        <div className="container-payment-page">
            <h1>Buyer Payment</h1>
            <PaymentForm userid={userid} onPaymentCreated={handlePaymentCreated} />
            <div className="payment-section">
                <h2>Recorded Payments</h2>
                <div className="payment-search">
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
        <form className="payment-form" onSubmit={handleSubmit}>
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
// PaymentList component with pagination
const PaymentList = ({ payments, searchId }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const paymentsPerPage = 3; // Display 5 payments per page

    // Filter payments based on search term
    const filteredPayments = searchId
        ? payments.filter(payment => payment.transactionId.toLowerCase().includes(searchId.toLowerCase()))
        : payments;

    // Calculate the number of pages
    const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

    // Calculate payments to display for the current page
    const startIndex = (currentPage - 1) * paymentsPerPage;
    const currentPayments = filteredPayments.slice(startIndex, startIndex + paymentsPerPage);

    // Change page
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <div>
            <ul className="payment-list">
                {currentPayments.length > 0 ? (
                    currentPayments.map(payment => (
                        <li key={payment.paymentid}>
                            <span className="label">Amount:</span> {payment.amount}, 
                            <span className="label"> Date:</span> {payment.paymentDate}, 
                            <span className="label"> Method:</span> {payment.method}, 
                            <span className="label"> Order ID:</span> {payment.transactionId}, 
                            <span className="label"> Notes:</span> {payment.notes}
                        </li>
                    ))
                ) : (
                    <li>No payments found.</li>
                )}
            </ul>
            
            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button 
                    onClick={goToPreviousPage} 
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={goToNextPage} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};



export default PaymentPage;