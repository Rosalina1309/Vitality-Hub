import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, RegistrationData } from '@/interfaces/User';

interface AuthState {
  user: User | '';
  isRegistered: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: '',
  isRegistered: false,
  isAuthenticated: false,
  error: null,
};

export const loginAsync = createAsyncThunk<User, { usernameOrEmail: string; password: string }>(
  'auth/login',
  async({ usernameOrEmail, password }): Promise<User> => {
    try {
      const response = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'mutation ($input: LoginMutationInput!) { login(input: $input) { token } }',
          variables: {
            input: {
              usernameOrEmail: usernameOrEmail,
              password: password,
            },
          },
        }),
      });

      const responseBody = await response.json();

      if (responseBody.data && responseBody.data.login && responseBody.data.login.token) {
        const token = responseBody.data.login.token;
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
      const response = await fetch('http://localhost:3001/graphql', {
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
      });

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = '';
      state.isRegistered = false;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.error = 'Login failed. Wrong username and/or password.';
      })
      .addCase(registerAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.isRegistered = true;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.error = 'Registration failed. Pls check form input';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
