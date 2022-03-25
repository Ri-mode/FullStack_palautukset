interface ExerciseFeedback {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseData {
  hourTarget: number;
  daysData: Array<number>;
}

const parseDays = (args: Array<string>): ExerciseData => {
  let days: Array<number> = [];
  //console.log("testi", args);
  if (args.length < 4) throw new Error('Not enough arguments!');

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) throw new Error('Provided values were not numbers!');
    days = days.concat(Number(args[i]));
  }

  if (!isNaN(Number(args[2]))) {
    return {
      hourTarget: Number(args[2]),
      daysData: days
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
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


try {
  const { hourTarget, daysData } = parseDays(process.argv);
  console.log('Onnistuu', calculateExercise(daysData, hourTarget));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
