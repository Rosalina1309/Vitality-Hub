

import MainPage from '../components/MainPage'
import styles from './page.module.css';


const HomePage: React.FC = () => {
  return (
    <main className={styles.main}>
        <h1>Vitality Hub</h1>
      < MainPage />
    </main>
  )
}

export default HomePage;