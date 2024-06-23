import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './style.css';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });


  const navigate = useNavigate();

  const handleUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!loginResponse.ok) {
        throw new Error(`Login request failed: ${loginResponse.status}`);
      }

      const loginData = await loginResponse.json();
      const userId = loginData.userId;

      console.log(`User ID: ${userId}`); // Vérifiez que l'ID est correct

      navigate(`/profile/${userId}`); // Redirigez vers la page de profil

    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div class="login">
      <h1>Login</h1>
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        
        <div className="input-box">
          <input
            type="email"
            name="email" 
            value={user.email}
            onChange={handleUser}
            placeholder="Email"
            required
          />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleUser}
            placeholder="Password"
            required
          />
          <FaLock className="icon" />
        </div>
        <div class="divider"><b>OR</b></div>
        <div class="forgotwrapper"><div class="forgot"><Link to="/forgot-password">Forgot Password?</Link></div></div>
        <button type="submit">Login</button>
        <div class="infobox">
        <p>Don't have an account?<Link to="/signup">sign-up</Link></p>
        </div>
      </form>
    </div>
    </div>
    
  );
};

export default Login;
