import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './authContext';
import * as serviceWorker from './serviceWorker';
export const PortConnectToBackEnd = 3001;//swap between 3001 9000
ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
    , document.getElementById('root'));

serviceWorker.unregister();
