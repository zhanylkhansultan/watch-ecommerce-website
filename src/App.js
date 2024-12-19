import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Signup from './comp/LoginSignup/LoginSignup';
import Login from './comp/Login/login';
import Verify from './comp/Verify';
import Home from './comp/home';
import Nav from './comp/nav';
import Profile from './comp/Profile';
import { UserProvider } from './comp/UserContext'; 
import Products from './comp/Products';

// Import styles
import './App.css';


function App() {
    return (
        <UserProvider>
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Signup />} /> {/* Default route redirects to Signup */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </Router>
        </UserProvider>
    );
}

export default App;
