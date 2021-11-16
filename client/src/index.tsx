import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Application from './application';
import reportWebVitals from './reportWebVitals';
import './assets/styles/dots.css';

ReactDOM.render(
    <BrowserRouter>
        <Application />
    </BrowserRouter>,
    document.getElementById('root')
);

reportWebVitals();
