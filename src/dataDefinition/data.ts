import { Asset } from "react-native-image-picker"

export type ExerciseSet = {
  weight: number;
  done: boolean;
};
export type RegularSetClass = ExerciseSet & {
  reps: number;
};
export type StretchingSetClass = ExerciseSet & {
  duration: number;
};
export type CardioSetClass = ExerciseSet & {
  duration: number;
  distance: number;
};

export type Exercise = {
  name: string;
  instructions: string[];
  category: string;
  equipment: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
};

export type ModelExercise = Exercise & {
  sets: ExerciseSet[];
  annotation: string;
};

export type SessionExercise = ModelExercise & {
  userMediaContent: Asset[];
};

export interface TrainingModel {
  name: string;
  author: string;
  exercises: ModelExercise[];
  mediaContent: Asset[];
  description: string;
}

export interface TrainingSession extends TrainingModel {
  exercises: SessionExercise[];
  duration: number;
  date: number;
  model?: string;
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
