export default function calculateAdvice(bmi: number) {
  if (bmi < 16) {
    return 'You are severely underweight. Please consult a healthcare professional.';
  } else if (bmi >= 16 && bmi < 16.9) {
    return 'You are significantly underweight. Please consult a healthcare professional.';
  } else if (bmi >= 17 && bmi < 18.4) {
    return 'You are mildly underweight. Consider gaining weight through a balanced diet.';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Your weight is normal. Maintain a healthy lifestyle for overall well-being.';
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'You are overweight. Focus on a balanced diet and regular exercise.';
  } else if (bmi >= 30 && bmi < 34.9) {
    return 'You are obese (Class 1). Consult a healthcare professional for weight management.';
  } else if (bmi >= 35 && bmi < 39.9) {
    return 'You are obese (Class 2). Urgently consult a healthcare professional for weight management.';
  } else {
    return 'You are severely obese (Class 3). Immediate medical attention is necessary.';
  }
}
