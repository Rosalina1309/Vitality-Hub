import Link from 'next/link';
import styles from '@/styles/navbar.module.css';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { toggle } from '@/slices/menuSlice';
import { logout, setIsAuthenticated } from '@/slices/authSlice';
import { useEffect } from 'react';

export default function Navbar() {
  const isOpen = useAppSelector(state => state.menu.isOpen);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  function toggleMenu() {
    dispatch(toggle());
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(setIsAuthenticated());
  }, [])
  return (
    <div>
      <button
        id='hamburger'
        className={styles.hamburger}
        onClick={toggleMenu}></button>
      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <button className={styles.close} onClick={toggleMenu}></button>
        <ul>
          <li>
            <Link href='/' onClick={toggleMenu} className={styles.home}>
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link
                href='/'
                onClick={() => {
                  dispatch(logout());
                  localStorage.clear();
                  toggleMenu();
                }}
                className={styles.logout}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link href='/login' onClick={toggleMenu} className={styles.login}>
                Login / Register
              </Link>
            </li>
          )}
          <li>
            {isAuthenticated && (
              <Link
                href='/profile'
                onClick={toggleMenu}
                className={styles.profile}>
                Profile
              </Link>
            )}
          </li>
          <li>
            <Link
              href='/recipes'
              onClick={toggleMenu}
              className={styles.recipes}>
              Recipes
            </Link>
          </li>
          <li>
            <Link
              href='/exercises'
              onClick={toggleMenu}
              className={styles.exercises}>
              Exercises
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
