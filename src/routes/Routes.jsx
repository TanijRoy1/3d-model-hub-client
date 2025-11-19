import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import AllModels from '../pages/AllModels';
import CreateModel from '../pages/CreateModel';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UpdateModel from '../pages/UpdateModel';
import ModelDetails from '../pages/ModelDetails';
import MyModels from '../pages/MyModels';
import PrivateRoute from './PrivateRoute';
import MyDownloads from '../pages/MyDownloads';

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "allModels",
                Component: AllModels
            },
            {
                path: "createModel",
                Component: CreateModel
            },
            {
                path: "updateModel/:id",
                Component: UpdateModel
            },
            {
                path: "modelDetails/:id",
                element: <PrivateRoute><ModelDetails></ModelDetails></PrivateRoute>
            },
            {
                path: "myModels",
                element: <PrivateRoute><MyModels></MyModels></PrivateRoute>
            },
            {
                path: "myDownloads",
                element: <PrivateRoute><MyDownloads></MyDownloads></PrivateRoute>
            },
        ]
    },
    {
        path: "/auth",
        Component : AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    },
    
])
export default router;