import React from 'react';

import './Login.css';

export const Login = () => (
  <div className="login-container">
    <form className="login-form" action="/" method="POST">
      <input type="text" placeholder="Username" name="username" required /><br />
      <input type="password" placeholder="Password" name="password" required /><br />
      <button type="submit">Submit</button>
    </form>
  </div>
)
