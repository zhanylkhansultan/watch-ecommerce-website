import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        role: '',
        imageUrl: '',
        sellerRequests: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login'); // Redirect to login if no token
            return;
        }

        axios
            .get('http://localhost:9000/users/profile', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setProfile(res.data); // Set profile data
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching profile:', err.response || err.message);
                if (err.response?.status === 401) {
                    setError('Unauthorized. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/login'); // Redirect to login
                } else {
                    setError('Failed to load profile. Please try again.');
                }
                setLoading(false);
            });
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-details">
                <img
                    src={profile.imageUrl || 'default-avatar.png'}
                    alt="Profile Avatar"
                    className="profile-image"
                />
                <p><strong>First Name:</strong> {profile.firstname}</p>
                <p><strong>Last Name:</strong> {profile.lastname}</p>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Role:</strong> {profile.role}</p>
                {profile.sellerRequests && profile.sellerRequests.length > 0 && (
                    <div>
                        <h3>Seller Requests:</h3>
                        <ul>
                            {profile.sellerRequests.map((request) => (
                                <li key={request.id}>
                                    Request ID: {request.id}, Status: {request.status}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
