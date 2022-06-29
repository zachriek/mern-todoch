import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <section className="not-found">
            <h1>Not Found</h1>
            <Link to="/" className="mt-2 text-dark">
                Back to Home
            </Link>
        </section>
    );
};

export default NotFound;
