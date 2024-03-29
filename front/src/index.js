import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./pages/LoginPage.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainAppPage from "./pages/MainAppPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import {DevTools} from "jotai-devtools"; 
import { createStore, Provider } from 'jotai';

const customStore = createStore();

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage/>,
        errorElement: <NotFoundPage/>,
    },
    {
        path: '/mainapp',
        element: <MainAppPage/>,
        errorElement: <NotFoundPage/>,
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={customStore} >

            <DevTools/>
            <RouterProvider router={router}/>
                        
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
