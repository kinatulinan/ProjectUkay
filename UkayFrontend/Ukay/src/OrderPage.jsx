import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedItems, totalPrice } = location.state || { selectedItems: [], totalPrice: 0 };

    const [openDialog, setOpenDialog] = useState(false);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [barangay, setBarangay] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [additionalNote, setAdditionalNote] = useState('');

    const [shippingFee, setShippingFee] = useState(0);
    const [selectedCoupon, setSelectedCoupon] = useState(0);

    const subtotal = selectedItems.reduce((acc, item) => acc + (item.sellProductPrice * item.quantity), 0);

    useEffect(() => {
        if (subtotal > 0) {
            const shippingFees = [50, 60, 65, 70, 75, 80];
            const couponValues = [10, 15, 20, 25];

            // Randomly select shipping fee and coupon value
            setShippingFee(shippingFees[Math.floor(Math.random() * shippingFees.length)]);
            setSelectedCoupon(couponValues[Math.floor(Math.random() * couponValues.length)]);
        }
    }, [subtotal]);

    const grandTotal = subtotal + shippingFee;
    const finalTotal = grandTotal - selectedCoupon;

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const currentDate = new Date();
    const startShippingDate = new Date(currentDate);
    const endShippingDate = new Date(currentDate);
    startShippingDate.setDate(currentDate.getDate() + 5);
    endShippingDate.setDate(currentDate.getDate() + 6);

    const formatDate = (date) => {
        const options = { month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formattedStartDate = formatDate(startShippingDate);
    const formattedEndDate = formatDate(endShippingDate);

    const handleEditAddressClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveAddress = () => {
        const formattedAddress = `${barangay}, ${city}, ${state}, ${country}, ${postalCode} ${additionalNote}`;
        
        const updatedUserDetails = { ...userDetails, address: formattedAddress };
        localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));

        setOpenDialog(false);
    };

    const handleContinue = () => {
        navigate('/payment', { state: { selectedItems, totalPrice: grandTotal } });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 3, margin: '20px', backgroundColor: '#f5f5f5' }}>
            {/* Left Section: Order Details */}
            <Box sx={{ width: '60%' }}>
                {/* Shipping Address */}
                <Box sx={{ marginBottom: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }} gutterBottom>Shipping Address</Typography>
                    <Paper sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <Typography variant="body1"><b>{userDetails?.fullName}</b></Typography>

                            <Typography variant="body1" sx={{ fontSize: '14px' }}>{userDetails?.mobile}</Typography>

                            <Typography variant="body1">{userDetails?.address}</Typography>

                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                {userDetails?.additionalNote}
                            </Typography>

                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button
                                    sx={{
                                        padding: '6px 16px',
                                        color: '#000000',
                                        backgroundColor: '#ffffff',
                                        borderRadius: '30px',
                                        textTransform: 'capitalize',
                                        '&:focus': { outline: 'none' },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '0%',
                                            width: '100%',
                                            height: '1.3px',
                                            backgroundColor: '#b3b5b5',
                                            transform: 'scaleX(0)',
                                            transformOrigin: 'bottom right',
                                            transition: 'transform 1s ease, background-color 0.5s ease',
                                        },
                                        '&:hover': {
                                            borderRadius: '30px',
                                            backgroundColor: 'white',
                                            '&::after': {
                                                backgroundColor: 'black',
                                                transform: 'scaleX(1)',
                                                transformOrigin: 'bottom left',
                                            },
                                        },
                                    }}
                                    onClick={handleEditAddressClick}
                                >
                                    Update Address
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                {/* Order Details */}
                <Box sx={{ marginBottom: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }} gutterBottom>Order Details</Typography>
                    <Paper sx={{ padding: 2 }}>
                        {selectedItems.map((item, index) => (
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0.5, borderBottom: '0.5px solid #e0e0e0', paddingBottom: 1 }}>
                                <Typography variant="body1">{item.sellProductName || item.name}</Typography>
                                <Typography variant="body1">₱ <strong>{(item.sellProductPrice * item.quantity).toFixed(2)}</strong></Typography>
                            </Box>
                        ))}
                    </Paper>
                </Box>

                {/* Shipping Option */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }} gutterBottom>Your Shipping Option</Typography>
                    <Paper sx={{ padding: 2, textAlign: 'left' }}>
                        <Typography variant="body1">Standard Shipping</Typography>
                        <Typography variant="body1">Estimated Arrival by {formattedStartDate} - {formattedEndDate}</Typography>
                    </Paper>
                </Box>
            </Box>

            {/* Right Section: Order Summary */}
            <Box sx={{ width: '35%', backgroundColor: '#ffffff', padding: 3, borderRadius: '8px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }} gutterBottom>Order Summary</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Box sx={{ marginBottom: 2 }}>
                    {/* Subtotal */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                        <Typography variant="body1">Subtotal:</Typography>
                        <Typography variant="body1">₱{subtotal.toFixed(2)}</Typography>
                    </Box>
                    {/* Shipping Fee */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                        <Typography variant="body1">Shipping Fee:</Typography>
                        <Typography variant="body1">₱{shippingFee}</Typography>
                    </Box>
                    {/* Seller Coupon */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                        <Typography variant="body1">Seller Coupon:</Typography>
                        <Typography variant="body1" sx={{ color: '#D02A2A' }}>- ₱{selectedCoupon}</Typography>
                    </Box>
                </Box>
                <Divider sx={{ marginBottom: 2 }} />
                <Box sx={{ marginBottom: 3 }}>
                    {/* Grand Total */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Grand Total:</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>₱{finalTotal.toFixed(2)}</Typography>
                    </Box>
                </Box>
                <Button sx={{
                    width: '100%',
                    color: '#F5F5F5',
                    backgroundColor: 'black',
                    borderRadius: '30px',
                    marginRight: '10px',
                    textTransform: 'capitalize',
                    '&:focus': { outline: 'none' },
                    '&:hover': {
                        backgroundColor: 'white',
                        color: 'black',
                    },
                }} onClick={handleContinue}>
                    Continue to Payment
                </Button>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body2" color="textSecondary">
                    U-Kay is committed to protecting your payment information and only shares your credit card information with our payment service providers who agreed to safeguard your information.
                </Typography>
            </Box>

            {/* Edit Address Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Shipping Address</DialogTitle>
                <DialogContent>
                    <TextField label="Country" fullWidth margin="normal" value={country} onChange={(e) => setCountry(e.target.value)} />
                    <TextField label="State/Province" fullWidth margin="normal" value={state} onChange={(e) => setState(e.target.value)} />
                    <TextField label="City/Municipality" fullWidth margin="normal" value={city} onChange={(e) => setCity(e.target.value)} />
                    <TextField label="Barangay" fullWidth margin="normal" value={barangay} onChange={(e) => setBarangay(e.target.value)} />
                    <TextField label="Postal Code" fullWidth margin="normal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    <TextField label="Additional Note" fullWidth margin="normal" value={additionalNote} onChange={(e) => setAdditionalNote(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}
                        sx={{
                            color: '#0D0F1F',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '25px',
                            padding: '5px 20px',
                            textTransform: 'capitalize',
                            '&:focus': { outline: 'none' },
                            '&:hover': {
                                color: '#0D0F1F',
                                backgroundColor: '#F5F5F5',
                            },
                        }}
                    >Cancel</Button>
                    <Button onClick={handleSaveAddress}
                        sx={{
                            color: '#0D0F1F',
                            backgroundColor: '#F5F5F5',
                            borderRadius: '25px',
                            padding: '5px 20px',
                            textTransform: 'capitalize',
                            '&:focus': { outline: 'none' },
                            '&:hover': {
                                color: '#FFFFFF',
                                backgroundColor: '#0D0F1F',
                            },
                        }}
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}