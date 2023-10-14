
'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/loginComponent.module.css';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;


  const handleLogin = async () => {
    try {
      const response = await fetch(`${rootUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'mutation ($input: LoginMutationInput!) { login(input: $input) { token } }',
          variables: {
            input: {
              usernameOrEmail: username,
              password: password,
            },
          },
        }),
      });

      const responseBody = await response.json(); 

      if (responseBody.data && responseBody.data.login && responseBody.data.login.token) {
        localStorage.setItem('token', responseBody.data.login.token);
        setIsLoggedIn(true); 
      } else {
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.loginComponent}>  
       {isLoggedIn ? (
         <p>Logged In</p>
       ) : (
         <>
           <label htmlFor='username'>Username</label>
           <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
           <label htmlFor='password'>Password</label>
           <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

           <button onClick={handleLogin}>Login</button>
         </>
       )}
       {isLoggedIn && (
         <div>
           <Link href='/profile'legacyBehavior>
             <a>Go to User Profile</a>
           </Link>
         </div>
       )}
     </div>
  );
};

export default LoginComponent;
