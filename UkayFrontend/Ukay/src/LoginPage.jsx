import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert, Stack, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setIsFormValid(username && password);
    }, [username, password]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function save(event) {
        event.preventDefault();
        setErrorMessage(""); 
    
        try {
            const response = await axios.post("http://localhost:8080/api/register/login", {
                username,
                password,
            });
    
            console.log("API Response:", response.data);
    
            if (response.data.status) {
                console.log("Login successful, navigating to /home");
                navigate('/home');
            } else {
                setErrorMessage("Username or password does not match");
            }
        } catch (err) {
            setErrorMessage("An error occurred. Please try again.");
            console.error("Login error:", err);
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Log In
            </Typography>
            <form onSubmit={save}>
                <Stack spacing={3} mb={2}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"} // Dynamic type for password visibility
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isFormValid}
                >
                    Log In
                </Button>
            </form>
            {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {errorMessage}
                </Alert>
            )}
            <Box textAlign="center" sx={{ mt: 2 }}>
                <Typography variant="body2">
                    Don't have an account? <Link to="/register">Register Here</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default LoginPage;
