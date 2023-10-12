'use client'

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import styles from '../styles/registrationComponent.module.css'
import { registerSuccess } from '@/slices/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RegistrationComponent = () => {
  const isRegistered = useAppSelector(state => state.auth.isRegistered);
  const dispatch = useAppDispatch();
  const router = useRouter(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://localhost:3001/graphql', {
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
      console.log(responseBody);

      if (responseBody.data && responseBody.data.registerUser && responseBody.data.registerUser.token) {
        dispatch(registerSuccess(true));
        router.push('/login');
      } else {
        console.error('Registration failed.');
      }

    } catch (err) {
      console.error('Registration failed: ', err)
    }
  }
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
      </div>
      <div className={styles.goToLoginBox}>
        <p>Already have an account?</p>
        <Link href='/login' style={{ color: 'blue' }}>
          Login here
        </Link>
      </div>
    </>
    
  );
}

export default RegistrationComponent;