'use client'
import React from 'react';
const LoginComponent : React.FC = () => {
  return (
    <div>
      <label htmlFor='username'>Username</label>
      <input type="text"></input>
      <label htmlFor='password'>Password</label>
      <input type="text"></input>

    </div>
  )
}

export default LoginComponent