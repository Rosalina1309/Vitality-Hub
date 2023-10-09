
import React from 'react';
import Recipes from '../components/RecipesComponent';
import Navbar from '../components/Navbar';
import styles from '../styles/loginpage.module.css';
import CaloriesChartComponent from '../components/CaloriesChartComponent';
import '../app/globals.css';

 function LoginPage() {
  
   const handleSubmit = (e) => {
     e.preventDefault();
   };
 
   return (
     <div>
       <h1>Vitality Hub</h1>
       <Navbar />
       <div className={styles.container}>
         <h2>Login</h2>
         <form id="loginForm" onSubmit={handleSubmit}>
         <label className={styles.label} htmlFor="username">Username:</label>
           <input className={styles.input} type="text" id="username" name="username" required />
           
           <label className={styles.label} htmlFor="password">Password:</label>
           <input className={styles.input} type="password" id="password" name="password" required />
           <button className={styles.button} type="submit">Login</button>
         </form>
       </div>
     </div>
   );
 }
 
 export default LoginPage;
