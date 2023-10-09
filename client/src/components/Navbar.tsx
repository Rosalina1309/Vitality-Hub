'use client';
import Link from 'next/link';
import styles from '@/styles/navbar.module.css';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { toggle } from '@/slices/menuSlice';

export default function Navbar() {
  // const [isOpen, setIsOpen] = useState(false);
  const isOpen = useAppSelector(state => state.menu.isOpen);
  const dispatch = useAppDispatch();

  function toggleMenu() {
    dispatch(toggle());
    // setIsOpen(!isOpen);
  }

  return (
    <div>
      <button className={styles.hamburger} onClick={toggleMenu}></button>
      <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <button className={styles.close} onClick={toggleMenu}></button>
        <ul>
          <li>
            <Link href='/login' onClick={toggleMenu}>
              Login
            </Link>
          </li>
          <li>
            <Link href='/register' onClick={toggleMenu}>
              Register
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
        </ul>
      </div>
    </div>
  );
}
