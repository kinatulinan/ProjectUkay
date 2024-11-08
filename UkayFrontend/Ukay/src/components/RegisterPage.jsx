import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();
   
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [address, setAddress] = useState("");
    const [emailadd, setEmailadd] = useState("");
    const [mobile, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const [isFormValid, setIsFormValid] = useState(false);


    useEffect(() => {
        setIsFormValid(
            fname && lname && birthdate && address && emailadd && mobile && username && password
        );
    }, [fname, lname, birthdate, address, emailadd, mobile, username, password]);

    // Submit handler
    async function save(event) {
        event.preventDefault(); 
        try {
            const response = await axios.post("http://localhost:8080/api/register/save", {
                fname,
                mname,
                lname,
                birthdate, 
                address,
                emailadd,
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
        <div className="container mt-4">
            <div className="card">
                <h1>Account Registration</h1>
                <form onSubmit={save}> {/* Use onSubmit here */}
                    <div className="form-group">
                        <label htmlFor="fname">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fname"
                            placeholder="First Name"
                            value={fname}
                            onChange={(event) => setFname(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mname">Middle Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mname"
                            placeholder="Middle Name"
                            value={mname}
                            onChange={(event) => setMname(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lname">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lname"
                            placeholder="Last Name"
                            value={lname}
                            onChange={(event) => setLname(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Birthdate</label>
                        <input
                            type="text" // Change to date type
                            className="form-control"
                            id="birthdate"
                            placeholder="Birthdate"
                            value={birthdate}
                            onChange={(event) => setBirthdate(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailadd">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailadd"
                            placeholder="Email Address"
                            value={emailadd}
                            onChange={(event) => setEmailadd(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobile"
                            placeholder="Mobile"
                            value={mobile}
                            onChange={(event) => setMobile(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary mt-4"
                        disabled={!isFormValid} 
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;