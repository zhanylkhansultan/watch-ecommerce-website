import React, { useContext } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import './nav.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import UserContext

const Nav = () => {
    const { loggedIn } = useContext(UserContext); // Access logged-in state
    const navigate = useNavigate();

    const handleUserClick = () => {
        if (loggedIn) {
            navigate('/profile'); // Redirect to Profile if logged in
        } else {
            navigate('/signup'); // Redirect to Signup otherwise
        }
    };

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <div className="logo">
                            <img
                                className="logo_img"
                                src="/watch__logo-removebg-preview-removebg-preview.png"
                                alt="Logo"
                            />
                        </div>
                        <ul className="header__list">
                            <li className="header__list__item">Home</li>
                            <li className="header__list__item">Watch</li>
                            <li className="header__list__item">Glasses</li>
                            <li className="header__list__item">Jewelry</li>
                            <li className="header__list__item">Contacts</li>
                        </ul>
                        <div className="user__header">
                            <FaSearch />
                            <FaShoppingCart />
                            <FaUser
                                onClick={handleUserClick}
                                style={{ cursor: 'pointer' }} // Pointer cursor for clarity
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Nav;
