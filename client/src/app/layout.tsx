import './globals.css'
import styles from './layout.module.css';
import type { Metadata } from 'next'
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Vitality Hub',
  description: 'Vitality Hub is a health app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {

  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <h1 className='logo'>Vitality Hub</h1>
          <Navbar></Navbar>
        </header>
        {children}</body>
    </html>
  )
}
