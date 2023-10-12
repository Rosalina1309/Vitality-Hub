import ExercisesComponent from '@/components/ExercisesComponent';
import styles from '@/styles/profilePage.module.css'
const UserProfilePage = () => {
  return (
    <main className={styles.main}>
      <ExercisesComponent />
      Hi this is the User's Profile
    </main>
  );
};

export default UserProfilePage;
