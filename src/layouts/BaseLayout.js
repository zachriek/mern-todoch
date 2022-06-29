import React from 'react';
import { Navbar } from '../components';

const BaseLayout = ({ children, title }) => {
    document.title = `${title ? title : ''} - TODOCH`;

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default BaseLayout;
