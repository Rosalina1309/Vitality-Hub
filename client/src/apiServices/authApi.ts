import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, RegistrationData } from '@/interfaces/User';

export const loginAsync = createAsyncThunk<User, { usernameOrEmail: string; password: string }>(
  'auth/login',
  async ({ usernameOrEmail, password }): Promise<User> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query:
              'mutation ($input: LoginMutationInput!) { login(input: $input) { token } }',
            variables: {
              input: {
                usernameOrEmail: usernameOrEmail,
                password: password,
              },
            },
          }),
        }
      );

      const responseBody = await response.json();

      if (responseBody.data && responseBody.data.login && responseBody.data.login.token) {
        const token = responseBody.data.login.token;
        localStorage.setItem('token', token);
        const userInfo = JSON.parse(atob(token.split('.')[1]));
        return userInfo;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  }
);

export const registerAsync = createAsyncThunk<boolean, RegistrationData>(
  'auth/register',
  async (registrationData): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
            mutation ($input: RegisterUserMutationInput!) {
              registerUser(input: $input) {
                token
              }
            }
          `,
            variables: {
              input: {
                username: registrationData.username,
                email: registrationData.email,
                password: registrationData.password,
                gender: registrationData.gender,
              },
            },
          }),
        }
      );

      const responseBody = await response.json();
      console.log(responseBody);

      if (
        responseBody.data && responseBody.data.registerUser && responseBody.data.registerUser.token
      ) {
        return true;
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      throw error;
    }
  }
);