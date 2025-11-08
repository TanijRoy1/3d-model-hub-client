import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header></Header>
            <div className='flex-1 flex'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;