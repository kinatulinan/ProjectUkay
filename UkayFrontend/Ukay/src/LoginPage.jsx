import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Alert, Stack, Box, IconButton, InputAdornment, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import gif from './assets/login1.gif';
import CheckroomIcon from '@mui/icons-material/Checkroom';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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

            if (response.data.status) {
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
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '850px',
                width: '1000px',
                backgroundColor: '#0D0F1F',
                animation: 'gradientBackground 5s ease infinite',
                backgroundSize: '400% 400%',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: 4,
                marginTop: '35px',
            }}
        >
            <Grid container spacing={3} sx={{ width: '100%', maxWidth: 1200 }}>
                {/* Left Section */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" sx={{ fontFamily: 'Georgia, serif', fontSize: '45px',color: '#fff', fontWeight: 'bold', marginBottom: 2 }}>
                        Welcome to
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="home"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Lobster, Sans Serif',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            position: 'relative',
                            textDecoration: 'none',
                            color: '#E99E00',
                            fontSize: '60px',
                            background: 'linear-gradient(to right, #E99E00, white)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundSize: '200% 100%',
                            backgroundPosition: '200% 0',
                            transition: 'background-position 1.0s ease',
                            
                            '&:hover': {
                                backgroundPosition: '0 0',
                                WebkitTextFillColor: 'transparent',
                            },
                        }}
                    >
                        U-Kay
                    </Typography>
                    <img src={gif} alt="Animated GIF" style={{ maxWidth: '200%', width: '350px', height: '500px', borderRadius: '10px' }} />
                    <Typography variant="h3" sx={{ width: '300px',fontFamily: 'Georgia, serif', color: '#fff', fontWeight: 'bold', marginTop: 5, fontSize: '14px' }}>
                        Find unique items, create sustainable fashion, and support the thrift revolution!
                    </Typography>
                </Grid>

                

                {/* Right Section (Login Form) */}
                <Grid item xs={12} md={6} sx={{
                    backgroundColor: '#fff',
                    borderRadius: 3,
                    padding: 4,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <CheckroomIcon 
                            sx={{ 
                                color: '#E99E00',
                                fontSize: '70px',
                                background: 'linear-gradient(to right, #E99E00, white)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% 100%',
                                backgroundPosition: '200% 0',
                                transition: 'background-position 1.0s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundPosition: '0 0',
                                    WebkitTextFillColor: 'transparent',
                            },
                            }} 
                        />
                    </Box>
                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Welcome back!
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ color: 'gray', mb: 4 }}>
                        Please enter your details to log in
                    </Typography>
                    <form onSubmit={save}>
                        <Stack spacing={3}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>

                        {/* Remember Me and Forgot Password */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Remember me"
                                sx={{ fontSize: '0.875rem' }}
                            />
                            <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: '#000', textDecoration: 'none' }}>
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3,
                                height: '48px',
                                fontSize: '1rem',
                                textTransform: 'none',
                                backgroundColor: '#000',
                                color: '#fff',
                                '&:hover': { backgroundColor: '#333' },
                            }}
                            disabled={!isFormValid}
                        >
                            Log In
                        </Button>

                        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                            Don’t have an account?{' '}
                            <Link to="/register" style={{ fontWeight: 'bold', color: '#000', textDecoration: 'none' }}>
                                Sign Up
                            </Link>
                        </Typography>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default LoginPage;
