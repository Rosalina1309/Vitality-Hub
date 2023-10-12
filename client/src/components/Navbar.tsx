import Link from 'next/link';
import styles from '@/styles/navbar.module.css';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { toggle } from '@/slices/menuSlice';

export default function Navbar() {
  const isOpen = useAppSelector(state => state.menu.isOpen);
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
            <Link href='/' onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href='/login' onClick={toggleMenu}>
              Login / Register
            </Link>
          </li>
          <li>
            <Link href='/profile' onClick={toggleMenu}>
              Profile
            </Link>
          </li>
          <li>
            <Link href='/recipes' onClick={toggleMenu}>
              Recipes
            </Link>
          </li>
          <li>
            <Link href='/exercises' onClick={toggleMenu}>
              Exercises
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
