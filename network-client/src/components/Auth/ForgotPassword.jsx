import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmChange = (e) => {
    setConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div class="login" className="forgot-password-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <div className="input-box">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="New Password"
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            value={confirm}
            onChange={handleConfirmChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
