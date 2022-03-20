interface ExerciseFeedback {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}


const calculateExercise = (days: Array<number>, target: number): ExerciseFeedback => {
  const initialValue: number = 0;
  const sum: number = days.reduce(
    (previousValue, day) => previousValue + day,
    initialValue
  );
  const average = sum / days.length;
  let rate: number = 0;
  let rateText: string = '';
  if (average < target - 1) {
    rate = 1;
    rateText = 'too bad';
  } else if (average < target) {
    rate = 2;
    rateText = 'not too bad but could be better';
  } else {
    rate = 3;
    rateText = 'really good';
  }
  

  
  return {
    periodLength: days.length,
    trainingDays: days.filter(day => day > 0).length,
    success: (average >= target),
    rating: rate,
    ratingDescription: rateText,
    target: target,
    average: average
  }
}

const days: Array<number> = [3, 0, 2, 4.5, 4, 3, 1];

console.log(calculateExercise(days, 2));