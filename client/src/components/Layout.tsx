
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import styles from '@/styles/layout.module.css'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className={styles.header}>
        <Link href='/' className={styles.logo}>
          Vitality Hub
        </Link>
        <Navbar></Navbar>
      </header>
      {children}
    </>
  );
}
