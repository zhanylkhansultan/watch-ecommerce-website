import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Verify = () => {
    const [verificationCode, setCode] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email; // Extract email from navigation state

    const handleVerification = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:9000/auth/verify', { email, verificationCode })
            .then(() => {
                navigate('/login'); // Redirect to Login page without alert
            })
            .catch((err) => {
                console.error(err);
                alert('Verification failed! Please try again.');
            }); 
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Email Verification</h1>
                <form onSubmit={handleVerification} className="loginsignup-fields">
                    <p>Enter the 4-digit code sent to: <strong>{email}</strong></p>
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength={4}
                    />
                    <button type="submit">Verify</button>
                </form>
            </div>
        </div>
    );
};

export default Verify;
