import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import './index.css';
import Profile from './components/Profile/Profile';
import ForgotPassword from './components/Auth/ForgotPassword';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={
            <div>
              <h1>Welcome to the Network App</h1>
              <p>Please <a href="/login">login</a> or <a href="/signup">signup</a>.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
