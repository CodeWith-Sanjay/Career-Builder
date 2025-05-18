import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './LoginMain.css';
import './CompanyForm.css';

export default function CompanyRegister() {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate(); // Initialize useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/CompanyRegister", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ company_email: email, company_password: password, confirmPassword }),
            });

            if (!response.ok) {
                // Handle potential errors before parsing JSON
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed");
            }

            const data = await response.json(); // Parse response
            setMessage(data.message);

            // Navigate only if registration is successful
            navigate("/saveCompanyDetails");

        } catch (error) {
            console.error("Error during registration:", error);
            setMessage(error.message || "An error occurred. Please try again.");
        }
    };

  return (
    <div className='loginmain d-flex justify-content-center align-items-center m-3 p-4 vh-100'>

      <div className='loginform-container'>

        <div className='loginimage2'>

        </div>

        <div className='loginform'>

            <p className='loginform-quote'>Success starts here—step in and make an impact!</p>

            <form onSubmit={handleRegister}>
            <div className='form-login'>
            <input className='loginform-input' type="email" placeholder='Enter Email ' onChange={(e) => setEmail(e.target.value)} required/> <br />
            <input className='loginform-input' type="password" placeholder='Create Password ' onChange={(e) => setPassword(e.target.value)} required /> <br />
            <input className='loginform-input' type="password" placeholder='Confirm Password ' onChange={(e) => setConfirmPassword(e.target.value)} required /> <br />
            <button className="loginform-btn" type='submit'>SUBMIT</button>
            </div>
            </form>
            {message && <p>{message}</p>}
        </div>

      </div>
    </div>
  )
}
