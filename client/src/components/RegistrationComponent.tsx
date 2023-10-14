'use client'

import React, { useState } from 'react';
import styles from '../styles/registrationComponent.module.css'

const RegistrationComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); 
  
  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;

  const handleRegistration = async () => {
    try {
      const response = await fetch(`${rootUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation ($input: RegisterUserMutationInput!) {
              registerUser(input: $input) {
                token
              }
            }
          `,
          variables: {
            input: {
              username: username,
              email: email,
              password: password,
              gender: gender,
            },
          }, 
        })
      })
      const responseBody = await response.json();

      if (responseBody.data && responseBody.data.registerUser && responseBody.data.registerUser.token) {
        setIsRegistered(true); 
      } else {
        console.error('Registration failed.');
      }

    } catch (err) {
      console.error('Registration failed: ', err)
    }
  }
  return (
    <div className={styles.registerComponent}>

    <label htmlFor='username'>Username</label>
    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />

    <label htmlFor='email'>Email</label>
    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

    <label htmlFor='password'>Password</label>
    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

    <label htmlFor='gender'>Gender</label>
    <input type='text' value={gender} onChange={(e) => setGender(e.target.value)} />

    <button className={styles.registerButton} onClick={handleRegistration}>
      Register
    </button>
    {isRegistered && <p>Registration successful! Please login</p>}
  </div>
  );
}

export default RegistrationComponent;