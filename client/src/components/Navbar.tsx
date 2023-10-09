'use client';
import { useState } from 'react';
import styles from '../styles/navbar.module.css';

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
            <a href="/login"> 
              <button>Login</button>
            </a>
          </li>
            <a href="/register"> 
              <button>Register</button>
            </a>
          <li>
            <a href="/recipes"> 
              <button>Profile</button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
