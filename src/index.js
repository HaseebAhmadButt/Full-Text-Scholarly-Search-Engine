/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import User_Sign_In_State from "./Contexts/State/User_Sign_In_State";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <User_Sign_In_State>
        <BrowserRouter>
                 <App />
        </BrowserRouter>
    </User_Sign_In_State>
);
