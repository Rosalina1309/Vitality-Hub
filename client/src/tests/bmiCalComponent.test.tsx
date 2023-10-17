import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BMICalComponent from '@/components/BMICalComponent';
import { Provider } from 'react-redux';
import store from '@/store/store';

describe('BMICalComponent', () => {
  it ('renders without errors', () => {
    render (
      <Provider store ={store} >
        <BMICalComponent />
      </Provider>
    );
    const titleElement = screen.getByText('BMI Calculator');
    expect(titleElement).toBeInTheDocument();
  });


  it('updates height and weight input values', () => {
    render(
      <Provider store={store}>
        <BMICalComponent />
      </Provider>
    );

    const heightInput = screen.getByLabelText('Height (in cm):');
    const weightInput = screen.getByLabelText('Weight (in kg):');

    fireEvent.change(heightInput, { target: { value: '180' } });
    fireEvent.change(weightInput, { target: { value: '75' } });

    expect(heightInput).toHaveValue('180');
    expect(weightInput).toHaveValue('75');
  });

 
  it('calculates BMI correctly on button click', async () => {
    render(
    <Provider store={store}>
      <BMICalComponent />
    </Provider>);
  
    const heightInput = screen.getByLabelText('Height (in cm):');
    const weightInput = screen.getByLabelText('Weight (in kg):');
    const calculateButton = screen.getByText('Calculate');
  
    fireEvent.change(heightInput, { target: { value: '180' } });
    fireEvent.change(weightInput, { target: { value: '75' } });
    fireEvent.click(calculateButton);
    await waitFor(() => {
      const bmiValueElement = screen.getByText(/Your BMI:\s*(\d+\.\d+)/);
      const bmiValueMatch = bmiValueElement.textContent.match(/Your BMI:\s*(\d+\.\d+)/);
      
      if (bmiValueMatch) {
        const bmiValue = parseFloat(bmiValueMatch[1]);
        expect(bmiValue).toBeCloseTo(23.15, 2); // 
      } else {
        fail('Unexpected format for BMI value.');
      }
    });
  });

  it('does not calculate BMI with invalid input', async () => {
    render(
      <Provider store={store}>
        <BMICalComponent />
      </Provider>
    );
  
    const heightInput = screen.getByLabelText('Height (in cm):');
    const weightInput = screen.getByLabelText('Weight (in kg):');
    const calculateButton = screen.getByText('Calculate');
  
    fireEvent.change(heightInput, { target: { value: 'abc' } });
    fireEvent.change(weightInput, { target: { value: '' } }); // Empty string
  
    fireEvent.click(calculateButton);
  
    const bmiValueElement = screen.queryByText(/Your BMI:\s*(\d+\.\d+)/);
    expect(bmiValueElement).toBeNull();
  });
} )