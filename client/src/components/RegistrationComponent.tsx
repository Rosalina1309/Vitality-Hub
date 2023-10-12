'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import styles from '../styles/registrationComponent.module.css';
import { registerSuccess } from '@/slices/authSlice';
import Link from 'next/link';

const RegistrationComponent = () => {
  const isRegistered = useAppSelector(state => state.auth.isRegistered);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://localhost:4000/graphql', {
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
      });

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
        {isRegistered && <p>Registration successful! Please login</p>}
      </div>
      <div className={styles.goToLoginBox}>
        <p>Already have an account?</p>
        <Link href='/login'>Login here</Link>
      </div>
    </>
  );
};

export default RegistrationComponent;
