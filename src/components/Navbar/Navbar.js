import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    TODOCH
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-link ${location.pathname === '/' && 'active'}`} to="/">
                            Home
                        </Link>
                        <Link className={`nav-link ${location.pathname.includes('/tasks') && 'active'}`} to="/tasks">
                            Tasks
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
