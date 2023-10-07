'use client';
import { useState } from 'react';
import styles from './navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button className={styles.hamburger} onClick={toggleMenu}></button>
      <div
        className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <button className={styles.close} onClick={toggleMenu}></button>
        <ul>
          <li>
            <button>Login</button>
          </li>
          <li>
            <button>Register</button>
          </li>
          <li>
            <button>Profile</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
