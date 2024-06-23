import React, { useState } from 'react';
import './style.css';

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Utilisateur ajouté avec succès');
        window.location.href = '/login';
      } else {
        alert('Échec de l\'ajout de l\'utilisateur: ' + data.error);
      }

      console.log(data);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      alert('Erreur lors de la soumission du formulaire: ' + error.message);
    }
  };

  return (
    <div class="signup"className="wrapper">
      <h1>Signup</h1>
      <div  className="form-box register">
      
        <form onSubmit={handleSubmit}>
         
         
          <div className="input-box">
<input
           type="text"
           name="user_name"
           value={userDetails.user_name}
           onChange={handleChange}
           placeholder="user_name"
           required
         />
</div>
          <div className="input-box">
            
<input
        type="text"
        name="first_name"
        value={userDetails.first_name}
        onChange={handleChange}
        placeholder="First Name"
        required
      />

</div>

<div className="input-box">
<input
           type="text"
           name="last_name"
           value={userDetails.last_name}
           onChange={handleChange}
           placeholder="Last Name"
           required
         />
</div>
<div className="input-box">
<input
           type="date"
           name="birth_date"
           value={userDetails.birth_date}
           onChange={handleChange}
           required
         />
</div>
<div className="input-box">
<input
           type="email"
           name="email"
           value={userDetails.email}
           onChange={handleChange}
           placeholder="Email"
           required
         />

</div>
<div className="input-box">
<input
           type="password"
           name="password"
           value={userDetails.password}
           onChange={handleChange}
           placeholder="Password"
           required
         />

          </div>
          <button type="submit">Signup</button>
          <div className="register-link">
          <div class="infobox">
            <p>for login <a href="./Login">Login</a></p>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
