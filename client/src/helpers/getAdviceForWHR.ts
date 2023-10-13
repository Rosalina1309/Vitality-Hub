export default function getAdviceForWHR(gender: string, whr: number): string {
  if (gender === 'male') {
    if (whr < 0.9) {
      return 'Your WHR is within the healthy range for males.';
    } else {
      return 'Your WHR is higher than the healthy range for males. Consider lifestyle changes.';
    }
  } else {
    if (whr < 0.8) {
      return 'Your WHR is within the healthy range for females.';
    } else {
      return 'Your WHR is higher than the healthy range for females. Consider lifestyle changes.';
    }
  }
}
