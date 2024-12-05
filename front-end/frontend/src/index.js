import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Your global styles
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application wrapped with Router for routing functionality
root.render(
  <Router>
    <App />
  </Router>
);
