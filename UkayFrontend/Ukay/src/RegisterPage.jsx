import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Button, Typography, Box, IconButton, InputAdornment, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import gif from './assets/register2.gif';
import CheckroomIcon from '@mui/icons-material/Checkroom';

function RegisterPage() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    useEffect(() => {
        const isPasswordValid = validatePassword(password);
        setPasswordError(isPasswordValid ? "" : "Password must be at least 8 characters long and contain at least one special character.");
        setIsFormValid(
            firstName &&
            lastName &&
            birthdate &&
            address &&
            email &&
            mobile &&
            username &&
            isPasswordValid
        );
    }, [firstName, lastName, birthdate, address, email, mobile, username, password]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
                const response = await axios.post("http://localhost:8080/api/register/save", {
                    fname: firstName,
                    mname: middleName,
                    lname: lastName,
                    birthdate,
                    address,
                    emailadd: email,
                    mobile,
                    username,
                    password,
                });
                alert("Account Successfully Registered");
                navigate("/login");

                localStorage.setItem("userDetails", JSON.stringify({
                    fullName: `${firstName} ${middleName} ${lastName}`,
                    address,
                    mobile,
                }));
            } catch (err) {
                if (err.response?.status === 409) {
                    alert("Username or email already exists. Please try again.");
                } else {
                    console.error(err.response?.data || err.message);
                    alert("Registration failed: " + (err.response?.data?.message || err.message));
                }
            }
    }

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '870px',
                width: '1200px',
                backgroundColor: '#0D0F1F',
                borderRadius: 3,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                padding: 4,
                animation: 'gradientBackground 5s ease infinite',
                marginTop: '40px',
            }}
        >
            <Grid container spacing={4} alignItems="center">
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center', padding: 2 }}>
                        <CheckroomIcon
                            sx={{
                                fontSize: 70,
                                color: '#E99E00',
                                mb: 2,
                                animation: 'bounce 2s infinite',
                                marginTop: '10px',
                            }}
                        />
                        <Typography
                            variant="h3"
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '28px',
                                mb: 2,
                                fontFamily: 'Georgia, serif',
                            }}
                        >
                            Come and{' '}
                            <span style={{ color: '#E99E00' }}>thrift</span> with us!
                        </Typography>
                        <img
                            src={gif}
                            alt="Register GIF"
                            style={{
                                width: '100%',
                                maxWidth: '350px',
                                
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                            }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'white',
                                mt: 3,
                                fontWeight: 400,
                                marginBottom: '4px',
                                fontFamily: 'Georgia, serif',
                            }}
                        >
                            Join our sustainable thrift revolution! Create your account today and explore a world of unique treasures.
                        </Typography>
                    </Box>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                        <CardContent>
                            <Box component="form" onSubmit={handleSubmit}>
                            <Typography
                            variant="h4"
                            sx={{ fontWeight: 'bold', color: 'black', mb: 2 }}
                        >
                            Create an account
                        </Typography>

                        <Typography variant="body2" align="center" sx={{ fontWeight: 'bold', color: '#E99E00', mb: 4 }}>
                            Please enter your details to log in
                        </Typography>

                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="First Name"
                                            variant="outlined"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Middle Name"
                                            variant="outlined"
                                            onChange={(e) => setMiddleName(e.target.value)}
                                            value={middleName}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Last Name"
                                            variant="outlined"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                </Grid>

                                <TextField
                                    label="Email Address"
                                    type="email"
                                    variant="outlined"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    label="Mobile Number"
                                    type="text"
                                    variant="outlined"
                                    onChange={(e) => setMobile(e.target.value)}
                                    value={mobile}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    label="Date of Birth"
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    value={birthdate}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    label="Username"
                                    variant="outlined"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="outlined"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    fullWidth
                                    required
                                    helperText={passwordError}
                                    error={!!passwordError}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ mb: 4 }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#E99E00',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: '#D18A00',
                                        },
                                    }}
                                    //disabled={!isFormValid}
                                >
                                    Register
                                </Button>
                            </Box>
                            <Box textAlign="center" sx={{ mt: 3 }}>
                                <Typography variant="body2">
                                    Already have an account?{' '}
                                    <Link to="/login" style={{ color: '#E99E00', fontWeight: 'bold' }}>
                                        Log in
                                    </Link>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RegisterPage;
