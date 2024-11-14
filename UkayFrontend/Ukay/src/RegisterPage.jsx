import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, TextField, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

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
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(
            firstName && lastName && birthdate && address && email && mobile && username && password
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
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register Form
                </Typography>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Middle Name"
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => setMiddleName(e.target.value)}
                        value={middleName}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        color="secondary"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    label="Address"
                    variant="outlined"
                    color="secondary"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    color="secondary"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Mobile"
                    type="text"
                    variant="outlined"
                    color="secondary"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    color="secondary"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    color="secondary"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    color="secondary"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setBirthdate(e.target.value)}
                    value={birthdate}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    disabled={!isFormValid}
                >
                    Register
                </Button>
            </Box>
            <Box textAlign="center" sx={{ mt: 2 }}>
                <Typography variant="body2">
                    Already have an account? <Link to="/login">Login Here</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default RegisterPage;
