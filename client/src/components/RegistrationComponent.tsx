<<<<<<< HEAD
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import styles from '../styles/registrationComponent.module.css';
import { registerSuccess } from '@/slices/authSlice';
import Link from 'next/link';

const RegistrationComponent = () => {
  const isRegistered = useAppSelector(state => state.auth.isRegistered);
  const dispatch = useAppDispatch();
=======
'use client'
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { clearError } from '@/slices/authSlice';
import styles from '../styles/registrationComponent.module.css'
import { registerAsync } from '@/apiServices/authApi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RegistrationComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter(); 
  const error = useAppSelector(state => state.auth.registrationError);
>>>>>>> quinten

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
<<<<<<< HEAD

  const handleRegistration = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL as string,
        {
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
          }),
        }
      );

      const responseBody = await response.json();
      console.log(responseBody);

      if (
        responseBody.data &&
        responseBody.data.registerUser &&
        responseBody.data.registerUser.token
      ) {
        dispatch(registerSuccess(true));
      } else {
        console.error('Registration failed.');
      }
    } catch (err) {
      console.error('Registration failed: ', err);
    }
  };
  return (
    <>
      <div className={styles.registerComponent}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <label htmlFor='gender'>Gender</label>
        <div className={styles.selectItem}>
          <select value={gender} onChange={e => setGender(e.target.value)}>
            <option value=''>Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>

        <button className={styles.registerButton} onClick={handleRegistration}>
          Register
        </button>
        {isRegistered && (
          <p>
            Registration successful! Please
            <Link href='/login'> login</Link>
          </p>
        )}
      </div>
      <div className={styles.goToLoginBox}>
        <p>Already have an account?</p>
        <Link href='/login'>Login here</Link>
      </div>
    </>
=======

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const handleRegistration = async () => {
    try {
      const registrationData = {
        username,
        email,
        password,
        gender,
      };

      const result = await dispatch(registerAsync(registrationData));

      if (registerAsync.fulfilled.match(result)) {
        router.push('/login');
      }
    } catch (e) {
      console.error('Registration failed: ', e);
    }
  };

  return (
    <>
      <div className={styles.registerComponent}>

        <label htmlFor='username'>Username</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor='email'>Email</label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor='password'>Password</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor='gender'>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value=''>Select Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>

        <button className={styles.registerButton} onClick={handleRegistration}>
          Register
        </button>
        {error && <p>{error}</p>}
      </div>
      <div className={styles.goToLoginBox}>
        <p>Already have an account?</p>
        <Link href='/login' style={{ color: 'blue' }}>
          Login here
        </Link>
      </div>
    </>
    
>>>>>>> quinten
  );
};

export default RegistrationComponent;
