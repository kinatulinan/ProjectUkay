import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setIsFormValid(username && password);
    }, [username, password]);

   async function save(event) {
    event.preventDefault();
    setErrorMessage("");

    try {
        const response = await axios.post("http://localhost:8080/api/register/login", {
        username,
        password,
        });

        console.log("API Response:", response.data); // Log the full response

        if (response.data.success) {
        console.log("Login successful, navigating to /home");
        navigate('/home');
        } else {
        setErrorMessage(response.data.message || "Login failed");
        }
    } catch (err) {
        setErrorMessage("An error occurred. Please try again.");
        console.error("Login error:", err);
    }
}

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={save}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    disabled={!isFormValid}
                >
                    Log In
                </button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default LoginPage;
