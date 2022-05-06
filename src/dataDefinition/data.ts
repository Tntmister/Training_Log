import { Asset } from "react-native-image-picker"
// Sets
export class ExerciseSet {
  weight = 0;
  done = false;
  mediaContent: Asset[] = [];
}
export class WESetClass extends ExerciseSet {
  repRange = [0, 0];
  repsDone? = 0;
}
export class StretchingSetClass extends ExerciseSet {
  wantedDuration = "00:00";
  duration = "00:00";
}
export class CardioSetClass extends ExerciseSet {
  duration = "00:00";
  distance = 0;
}

// Exercises
export type Exercise = {
  name: string;
  instructions: string[];
  category: string;
  equipment: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  sets: WESetClass[] | StretchingSetClass[] | CardioSetClass[];
  annotation: string;
  userMediaContent?: Asset[];
};

// Training Session
export class TrainingSession {
  name: string;
  description = "";
  exercises: Exercise[] = [];
  done = false;
  volume = 0;
  time = "";
  date = getTimestamp();

  constructor(exercises: Exercise[], name: string) {
    this.exercises = exercises
    this.name = name
  }
}

export type TrainingModel = {
  name: string;
  author: string;
  exercises: Exercise[];
  mediaContent: Asset[];
  description: string;
};

// auxiliar
function getTimestamp(): string {
  const curdate = new Date()
  const day =
    curdate.getDate() < 10 ? "0" + curdate.getDate() : curdate.getDate()
  const month =
    curdate.getMonth() < 9
      ? "0" + (curdate.getMonth() + 1)
      : curdate.getMonth() + 1
  const year = curdate.getFullYear()
  const hours =
    curdate.getHours() < 10 ? "0" + curdate.getHours() : curdate.getHours()
  const minutes =
    curdate.getMinutes() < 10
      ? "0" + curdate.getMinutes()
      : curdate.getMinutes()
  const seconds =
    curdate.getSeconds() < 10
      ? "0" + curdate.getSeconds()
      : curdate.getSeconds()
  const date =
    day +
    "/" +
    month +
    "/" +
    year +
    " | " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds

  return date
}

//--------------------------------------------------------------------------------//
/*const model1 = new TrainingModel()

console.log(model1)

model1.author = "Rafael Pardal"
model1.description = "Upper Body Workout - From Upper-Lower Split"

console.log(model1)

/*const ex1 = new BarbellExercise("Bench Press", 1, "Barbell Bench Press")
const ex2 = new BodyWeightExercise("Pull-Up", 2, "Overhand grip Pull-Up")

model1.exercises.push(ex1)
model1.exercises.push(ex2)

//console.log('\n' + JSON.stringify(model1, null, 1))

const session1 = model1.startSession()

console.log("TRAINING SESSION \n", JSON.stringify(session1, null, 1))

console.log(new Date().getTime())*/
