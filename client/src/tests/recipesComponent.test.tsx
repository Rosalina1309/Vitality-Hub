// import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RecipesComponent from '@/components/RecipesComponent';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { mockRecipes } from '@/mock/recipes.mock';
import '@testing-library/jest-dom/';

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({ data: { toggleFavorite: {} } }),
});

describe('Recipes Component', () => {
  beforeAll(() => {
    store.dispatch({ type: 'recipes/setRecipes', payload: mockRecipes });
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <RecipesComponent />
      </Provider>
    );
    const headerElement = screen.getByText('Recipes');
    expect(headerElement).toBeInTheDocument();
  });

});
