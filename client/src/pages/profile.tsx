import CaloriesChartComponent from '@/components/CaloriesChartComponent';
import ProfileInfosComponent from '@/components/ProfileInfosComponent';
import styles from '@/styles/profilePage.module.css'

const UserProfilePage = () => {
  return (
    <main className={styles.main}>
      <CaloriesChartComponent />
      <ProfileInfosComponent />
    </main>
  );
};

export default UserProfilePage;
