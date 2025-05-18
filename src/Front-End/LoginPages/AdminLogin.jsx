import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axios from "axios";

import "../HomePage/Header1.jsx";
import "./LoginMain.css";
import "./AdminLogin.css";

export default function AdminLogin() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/AdminLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                alert("Admin login successful!");
                localStorage.setItem("adminToken", data.token); // Store authentication token
                navigate("/AdminInterface"); // Redirect to Admin Dashboard
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error during admin login:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="loginmain d-flex justify-content-center align-items-center m-3 p-4" id="AdminLogin">
            <div className="loginform-container">
                <div className="loginform">
                    <p className="loginform-quote">Welcome Admin!</p>
                    <form onSubmit={handleLogin}>
                        <div className="form-login">
                            <input
                                className="loginform-input"
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <br />
                            <input
                                className="loginform-input"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <br />
                            <button className="loginform-btn" type="submit">SUBMIT</button>
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
}
