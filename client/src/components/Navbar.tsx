'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
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
