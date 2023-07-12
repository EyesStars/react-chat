import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 严格模式：调用两次
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
