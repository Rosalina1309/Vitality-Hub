import CalculatorsComponent from '@/components/CalculatorsComponent';
import ExercisesComponent from '@/components/ExercisesComponent';
import styles from '@/styles/profilePage.module.css'
const UserProfilePage = () => {
  return (
    <main className={styles.main}>
      <CalculatorsComponent />
    </main>
  );
};

export default UserProfilePage;
