import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Đảm bảo Tailwind đã được import ở đây

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
