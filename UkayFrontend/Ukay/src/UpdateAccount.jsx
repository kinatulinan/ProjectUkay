import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Stack,
    TextField,
    Button,
    Typography,
    Box,
    IconButton,
    InputAdornment,
    Card,
    CardContent,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function UpdateAccount() {
    const navigate = useNavigate();
    const { username } = useParams(); 
    const [userData, setUserData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // Fetch the user's current information
        axios.get(`http://localhost:8080/api/users/${username}`)
            .then(response => setUserData(response.data))
            .catch(err => console.error(err));
    }, [username]);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    useEffect(() => {
        const isPasswordValid = validatePassword(userData.password || "");
        setPasswordError(isPasswordValid ? "" : "Password must be at least 8 characters long and contain at least one special character.");
        setIsFormValid(
            userData.firstName &&
            userData.lastName &&
            userData.birthdate &&
            userData.address &&
            userData.email &&
            userData.mobile &&
            userData.username &&
            isPasswordValid
        );
    }, [userData]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/users/${username}`, userData);
            alert("Account successfully updated!");
            navigate("/profile"); // Redirect to a profile or home page
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Update failed: " + (err.response?.data?.message || err.message));
        }
    }

    return (
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: 550 }}>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Update Account
                        </Typography>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                name="firstName"
                                label="First Name"
                                variant="outlined"
                                color="secondary"
                                onChange={handleChange}
                                value={userData.firstName || ""}
                                fullWidth
                                required
                            />
                            <TextField
                                name="middleName"
                                label="Middle Name"
                                variant="outlined"
                                color="secondary"
                                onChange={handleChange}
                                value={userData.middleName || ""}
                                fullWidth
                            />
                            <TextField
                                name="lastName"
                                label="Last Name"
                                variant="outlined"
                                color="secondary"
                                onChange={handleChange}
                                value={userData.lastName || ""}
                                fullWidth
                                required
                            />
                        </Stack>
                        <TextField
                            name="address"
                            label="Address"
                            variant="outlined"
                            color="secondary"
                            onChange={handleChange}
                            value={userData.address || ""}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            color="secondary"
                            onChange={handleChange}
                            value={userData.email || ""}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            name="mobile"
                            label="Mobile"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            onChange={handleChange}
                            value={userData.mobile || ""}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            name="username"
                            label="Username"
                            variant="outlined"
                            color="secondary"
                            onChange={handleChange}
                            value={userData.username || ""}
                            fullWidth
                            required
                            disabled // Username should not be editable
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            color="secondary"
                            onChange={handleChange}
                            value={userData.password || ""}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
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
                        />
                        <TextField
                            name="birthdate"
                            label="Date of Birth"
                            type="text"
                            variant="outlined"
                            placeholder="yyyy-mm-dd"
                            color="secondary"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            value={userData.birthdate || ""}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={!isFormValid}
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#0D0F1F',
                                    color: 'white',
                                },
                                '&:disabled': {
                                    backgroundColor: '#B0B3BB',
                                },
                            }}
                        >
                            Update
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default UpdateAccount;
