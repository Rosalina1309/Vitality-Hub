import '@testing-library/jest-dom/';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginComponent from '@/components/LoginComponent';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { loginAsync } from '@/apiServices/authApi';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('LoginComponent', () => {
  it('renders without errors', () => {
    render(
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    );
    const titleElement = screen.getByText('Username');
    expect(titleElement).toBeInTheDocument();
  });

  it('allows input of username and password', () => {
    render(
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpassword');
  });

  it('displays error message when login fails', async () => {
    store.dispatch(
      loginAsync({
        usernameOrEmail: 'invaliduser',
        password: 'invalidpassword',
      })
    );

    render(
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'invaliduser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });

    fireEvent.click(loginButton);

    const errorElement = await screen.findByText(
      'Login failed. Wrong username and/or password.'
    );
    expect(errorElement).toBeInTheDocument();
  });
});
