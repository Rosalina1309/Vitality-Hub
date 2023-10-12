

// 'use client'

// import { useEffect, useState } from 'react';
// import { fetchUserInfos } from '../apiServices/fetchUserInfos';
// import { User, UserExercise, UserRecipe } from '../interfaces/UserInterfaces';
// import styles from '../styles/UserProfile.module.css';

// const UserProfile = () => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Retrieve the token from localStorage
//         const token = localStorage.getItem('token');
//         console.log(token)
//         if (token) {
//           const userData = await fetchUserInfos(token);
//           console.log('userData: ', userData)
//           console.log(userData.favoriteRecipes)
//           setUser(userData);
//         } else {
//           console.error('Token not found');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   function findRecipesById () {

//   }

//   return (
//     <div className={styles.userProfile}>
//       {user ? (
//         <>
//           <h1>Welcome, {user.username}!</h1>
//           <div className={styles.userInfo}>
//             <h2>User Information</h2>
//             <p>Email: {user.email}</p>
//             <p>Gender: {user.gender}</p>
//           </div>
//           <div className={styles.favoriteExercises}>
//             <h4>Favorite Exercises</h4>
//             <ul>
//               {user.favoriteExercises && user.favoriteExercises.map((exercise: UserExercise) => (
//                 <li key={exercise.exerciseId}>{exercise.exerciseId}</li>
//               ))}
//             </ul>
//           </div>
//           <div className={styles.favoriteRecipes}>
//             <h4>Favorite Recipes</h4>
//             <ul>
//               {user.favoriteRecipes && user.favoriteRecipes.map((recipe: UserRecipe) => (
//                 <li key={recipe.recipeId}>{recipe.recipeId}</li>
//               ))}
//             </ul>
//           </div>
//         </>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

'use client'
import { useEffect, useState } from 'react';
import { fetchRecipes } from '../apiServices/fetchRecipes';
import { Recipe } from '@/interfaces/Recipe';
import { User, UserExercise, UserRecipe  } from '../interfaces/UserInterfaces';
import styles from '../styles/UserProfile.module.css';
import { fetchUserInfos } from '@/apiServices/fetchUserInfos';
import { fetchExercises } from '@/apiServices/fetchExercises';

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const token = localStorage.getItem('token');

        if (token) {
         
          const userData = await fetchUserInfos(token);
          setUser(userData);

          const allRecipes = await fetchRecipes();
          setRecipes(allRecipes);

          const allExercises = await fetchExercises();

        } else {
          console.error('Token not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  function findRecipeById(recipeId: string): Recipe | undefined {
    return recipes.find((recipe) => recipe.id === recipeId);
  }

  return (
    <div className={styles.userProfile}>
    {user ? (
      <>
        <h1>Welcome, {user.username}!</h1>
        <div className={styles.userInfo}>
          <h2>User Information</h2>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
        </div>
        <div className={styles.favoriteExercises}>
          <h4>Favorite Exercises</h4>
          <ul>
            {user.favoriteExercises &&
              user.favoriteExercises.map((exercise: UserExercise) => (
                <li key={exercise.exerciseId}>{exercise.exerciseId}</li>
              ))}
          </ul>
        </div>
        <div className={styles.favoriteRecipes}>
          <h4>Favorite Recipes</h4>
          <ul>
            {user.favoriteRecipes &&
              user.favoriteRecipes.map((recipe: UserRecipe) => {
                const foundRecipe = findRecipeById(recipe.recipeId);
                return foundRecipe ? (
                  <li key={recipe.recipeId}>
                  <img src={foundRecipe.image} alt={foundRecipe.title} className={styles.recipeImage} />
                  <div>
                    <p>{foundRecipe.title}</p>
                    <p>Calories: {foundRecipe.calories}</p>
                  </div>
                </li>
                ) : null;
              })}
          </ul>
        </div>
      </>
    ) : (
      <p>Loading user data...</p>
    )}
  </div>
  );
};

export default UserProfile;

