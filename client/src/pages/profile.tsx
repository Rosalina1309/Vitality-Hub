import CalculatorsComponent from '@/components/CalculatorsComponent';
import CaloriesChartComponent from '@/components/CaloriesChartComponent';
import ProfileInfosComponent from '@/components/ProfileInfosComponent';
import styles from '@/styles/profilePage.module.css'

const UserProfilePage = () => {
  return (
    <main className={styles.main}>
      <ProfileInfosComponent />
      <CaloriesChartComponent />
      <CalculatorsComponent />
    </main>
  );
};

export default UserProfilePage;
