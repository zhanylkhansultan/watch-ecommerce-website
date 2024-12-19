import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginSignup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State for loading animation
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true); // Show loader while waiting for the response

        axios
            .post('http://localhost:9000/auth/signup', { username, email, password })
            .then((res) => {
                const message = res.data.message || 'User registered successfully!';
                alert(message);
                navigate('/verify', { state: { email } }); // Pass email to Verify page
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.message || 'Registration failed!';
                console.error(err);
                alert(`Error: ${errorMessage}`);
            })
            .finally(() => setLoading(false)); // Hide loader after response
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignup} className="loginsignup-fields">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading} // Disable inputs when loading
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                </form>
                {loading && <div className="loader"></div>} {/* Loader Display */}
                <p className="redirect-login">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
