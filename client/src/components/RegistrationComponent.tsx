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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

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
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.goToLoginBox}>
        <p>Already have an account?</p>
        <Link href='/login'>
          Login here
        </Link>
      </div>
    </>
  );
};

export default RegistrationComponent;
