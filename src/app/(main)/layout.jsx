import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const MainLayout = ({children}) => {
    return (
        <div>
            <Navbar/>
        <main>{children}</main>
        <Footer/>

        <ToastContainer position="top-center" />
        </div>
    );
};

export default MainLayout;