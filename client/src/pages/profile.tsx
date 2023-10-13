import CaloriesChartComponent from '@/components/CaloriesChartComponent';
import ProfileInfosComponent from '@/components/ProfileInfosComponent';
import styles from '@/styles/profilePage.module.css'

const UserProfilePage = () => {
  return (
    <main className={styles.main}>
      <ProfileInfosComponent />
      <CaloriesChartComponent />
    </main>
  );
};

export default UserProfilePage;
