import axios from 'axios';
import React, { useEffect, useState } from 'react';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(username && password);
    }, [username, password]);

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/register/login", {
                username,
                password,
            });
            alert("Account Successfully Logged In");
        } catch (err) {
            alert(err);
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
        </div>
    );
}

export default LoginPage;
