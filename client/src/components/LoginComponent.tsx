// 'use client'
// import React from 'react';
// const LoginComponent : React.FC = () => {
//   return (
//     <div>
//       <label htmlFor='username'>Username</label>
//       <input type="text"></input>
//       <label htmlFor='password'>Password</label>
//       <input type="text"></input>

//     </div>
//   )
// }

// export default LoginComponent
// LoginComponent.jsx

'use client'
import React, { useEffect, useState } from 'react';
import { getCSRFToken } from '../apiServices/getCSRFToken'; // Adjust the import path according to your file structure

const LoginComponent: React.FC = () => {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const token = await getCSRFToken();
        if (token) {
          setCsrfToken(token);
        } else {
          console.error('Failed to fetch CSRF token.');
        }
      } catch (error) {
        console.error('Error fetching CSRF Token:', error);
      }
    }

    // Call the function to fetch CSRF token when the component mounts
    fetchCsrfToken();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  return (
    <div>
      <label htmlFor='username'>Username</label>
      <input type='text'></input>
      <label htmlFor='password'>Password</label>
      <input type='text'></input>

      {/* You can now use the CSRF token in your component */}
      <p>CSRF Token: {csrfToken}</p>
    </div>
  );
};

export default LoginComponent;
