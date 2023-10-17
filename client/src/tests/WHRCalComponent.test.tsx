
import { render, screen, fireEvent } from '@testing-library/react';
import WHRCalComponent from '@/components/WHRCalComponent';
import { Provider } from 'react-redux';
import store from '@/store/store';

describe('WHRCalComponent', () => {
  it('renders without errors', () => {
    render(
      <Provider store={store}>
        <WHRCalComponent />
      </Provider>
    );
    const titleElement = screen.getByText('Waist-Hip Ratio Calculator');
    expect(titleElement).toBeInTheDocument();
  });

  it('updates gender correctly', () => {
    render(
      <Provider store={store}>
        <WHRCalComponent />
      </Provider>
    );

    const genderSelect = screen.getByLabelText('Gender:');
    expect(genderSelect).toBeInTheDocument();

    fireEvent.change(genderSelect, { target: { value: 'female' } });

    expect(genderSelect).toHaveValue('female');
  });

  it('calculates WHR correctly', () => {
    render(
      <Provider store={store}>
        <WHRCalComponent />
      </Provider>
    );

    const waistInput = screen.getByLabelText('Waist Circumference (in cm):');
    const hipInput = screen.getByLabelText('Hip Circumference (in cm):');
    const calculateButton = screen.getByText('Calculate');

    fireEvent.change(waistInput, { target: { value: '75' } });
    fireEvent.change(hipInput, { target: { value: '90' } });

    fireEvent.click(calculateButton);

    const adviceElement = screen.getByText(
      'Your WHR is higher than the healthy range for females. Consider lifestyle changes.'
    );
    expect(adviceElement).toBeInTheDocument();
  });

  it('displays error message for invalid inputs', () => {
    render(
      <Provider store={store}>
        <WHRCalComponent />
      </Provider>
    );

    const waistInput = screen.getByLabelText('Waist Circumference (in cm):');
    const hipInput = screen.getByLabelText('Hip Circumference (in cm):');
    const calculateButton = screen.getByText('Calculate');

    fireEvent.change(waistInput, { target: { value: '' } });
    fireEvent.change(hipInput, { target: { value: '' } });

    fireEvent.click(calculateButton);

    const errorMessage = screen.getByText(
      'Please enter valid waist and hip values.'
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
