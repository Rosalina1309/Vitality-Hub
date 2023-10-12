// 'use client'

// import { fetchRecipes } from "@/apiServices/fetchRecipes";
// import { Recipe } from "@/interfaces/Recipe";
// import React, { useState, useEffect } from "react";
// import styles from '../styles/recipesComponent.module.css'

// const RecipesComponent: React.FC = () => {
//   const [recipes, setRecipes] = useState<Recipe[]>();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchRecipes();
//         setRecipes(data);
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   return (
//     <div className={styles.recipesContainer}>
//       <h1>Recipes</h1>
//       {recipes &&
//         recipes.map((recipe) => (
//           <div className={styles.recipeBox} key={recipe.id}>
//             <h2>{recipe.title}</h2>
//             <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
//             <p>Calories: {recipe.calories}</p>
//             <p>Protein: {recipe.protein}</p>
//             <p>Fat: {recipe.fat}</p>
//             <p>Carbs: {recipe.carbs}</p>
//             <button>Today's Favourite</button>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default RecipesComponent;

'use client'
import { fetchRecipes } from "@/apiServices/fetchRecipes";
import { Recipe } from "@/interfaces/Recipe";
import React, { useState, useEffect } from "react";
import styles from '../styles/recipesComponent.module.css'

const RecipesComponent: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = (recipeId: string) => {
    if (favorites.includes(recipeId)) {
      // If recipe is already in favorites, remove it
      const updatedFavorites = favorites.filter(id => id !== recipeId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // If recipe is not in favorites, add it
      const updatedFavorites = [...favorites, recipeId];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      console.log(updatedFavorites)
    }
  };

  return (
    <div className={styles.recipesContainer}>
      <h1>Recipes</h1>
      {recipes &&
        recipes.map((recipe) => (
          <div className={styles.recipeBox} key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
            <p>Calories: {recipe.calories}</p>
            <p>Protein: {recipe.protein}</p>
            <p>Fat: {recipe.fat}</p>
            <p>Carbs: {recipe.carbs}</p>
            <button onClick={() => toggleFavorite(recipe.id)}>
              {favorites.includes(recipe.id) ? 'Remove from Favorites' : 'Today\'s Favorite'}
            </button>
          </div>
        ))}
    </div>
  );
};

export default RecipesComponent;
