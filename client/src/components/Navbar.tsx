import Link from 'next/link';
import styles from '@/styles/navbar.module.css';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { toggle } from '@/slices/menuSlice';
import { logout } from '@/slices/authSlice';

export default function Navbar() {
  const isOpen = useAppSelector(state => state.menu.isOpen);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  function toggleMenu() {
    dispatch(toggle());
  }

  return (
    <div>
      <button className={styles.hamburger} onClick={toggleMenu}></button>
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
                  toggleMenu();
                }}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link href='/login' onClick={toggleMenu}>
                Login / Register
              </Link>
            </li>
          )}
          <li>
            <Link
              href='/profile'
              onClick={toggleMenu}
              className={styles.profile}>
              Profile
            </Link>
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
