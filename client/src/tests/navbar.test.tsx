import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import { Provider } from 'react-redux';
import store from '@/store/store';

describe('Navbar Component', () => {
  it('renders buttons correctly', () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    const homeButton = screen.getByText('Home');
    const profileButton = screen.getByText('Profile');
    const recipesButton = screen.getByText('Recipes');
    const exercisesButton = screen.getByText('Exercises');

    expect(homeButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(recipesButton).toBeInTheDocument();
    expect(exercisesButton).toBeInTheDocument();
  });
});
