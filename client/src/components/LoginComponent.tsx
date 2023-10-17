import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { loginAsync } from '@/apiServices/authApi';
import { clearError } from '@/slices/authSlice';
import Link from 'next/link';
import styles from '../styles/loginComponent.module.css';
import { useRouter } from 'next/router';

const LoginComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const error = useAppSelector(state => state.auth.loginError);
  const isRegistered = useAppSelector(state => state.auth.isRegistered);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const handleLogin = async () => {
    try {
      const result = await dispatch(
        loginAsync({ usernameOrEmail: username, password })
      );

      if (loginAsync.fulfilled.match(result)) {
        router.push('/profile');
      }
    } catch (e) {
      console.error('Login failed: ', e);
    }
  };

  return (
    <>
      <div className={styles.loginComponent}>
        {isRegistered && <p>Please Login now.</p>}

        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}></input>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}></input>

        <button onClick={handleLogin}>Login</button>

        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.goToRegisterBox}>
        <p>New to Vitality Hub?</p>
        <Link href='/register'>
          Create an account
        </Link>
      </div>
    </>
  );
};

export default LoginComponent;
