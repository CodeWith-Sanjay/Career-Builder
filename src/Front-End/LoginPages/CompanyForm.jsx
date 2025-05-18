import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';

import './LoginMain.css';
import './CompanyForm.css';

export default function CompanyForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate(); // Initialize navigate function

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/CompanyLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    company_email: email,
                    company_password: password,
                }),
            });

            const data = await response.json(); // Get response data once

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            setMessage(data.message);
            alert("Login successful!");

            // Store authentication token (if applicable)
            // localStorage.setItem("jobApplicantToken", data.token);
            localStorage.setItem("token", data.token);

            // Redirect user using useNavigate (better than window.location.href)
            navigate("/saveCompanyDetails");

        } catch (error) {
            console.error("Error during login:", error);
            setMessage(error.message || "An error occurred during login. Please try again.");
        }
    };

  return (
    <div className='loginmain d-flex justify-content-center align-items-center m-3 p-4 vh-100'>

      <div className='loginform-container'>

        <div className='loginimage2'>

        </div>

        <div className='loginform'>

            <p className='loginform-quote'>Success starts here—step in and make an impact!</p>

            <form onSubmit={handleLogin}>
            <div className='form-login'>
            <input className='loginform-input' type="email" placeholder='Enter Email ' onChange={(e) => setEmail(e.target.value)} required/> <br />
            <input className='loginform-input' type="password" placeholder='Enter Password ' onChange={(e) => setPassword(e.target.value)} required /> <br />
            <button className="loginform-btn" type='submit'>SUBMIT</button>
            <p className='pt-3'>Didn't have an account? <a className='loginform-link' href="CompanyRegister">Register</a></p>
            </div>
            </form>
            {message && <p className="error-message">{message}</p>}
        </div>

      </div>
    </div>
  )
}
