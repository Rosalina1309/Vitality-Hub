'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { loginSuccess } from '@/slices/authSlice';
import Link from 'next/link';
import styles from '../styles/loginComponent.module.css';
import { useRouter } from 'next/router';

const LoginComponent = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query:
            'mutation ($input: LoginMutationInput!) { login(input: $input) { token } }',
          variables: {
            input: {
              usernameOrEmail: username,
              password: password,
            },
          },
        }),
      });

      const responseBody = await response.json();

      if (
        responseBody.data &&
        responseBody.data.login &&
        responseBody.data.login.token
      ) {
        localStorage.setItem('token', responseBody.data.login.token);
        dispatch(loginSuccess(true));
        router.push('/profile');
      } else {
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <div className={styles.loginComponent}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}></input>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}></input>

        <button onClick={handleLogin}>Login</button>
      </div>
      {!isAuthenticated && (
        <div className={styles.goToRegisterBox}>
          <p>New to Vitality Hub?</p>
          <Link href='/register'>
            Create an account
          </Link>
        </div>
      )}
    </>
  );
};

export default LoginComponent;
