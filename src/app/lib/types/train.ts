import { Asset } from "react-native-image-picker"

export interface ExerciseSet {
  weight: number;
  done: boolean;
}
export interface RegularSetClass extends ExerciseSet {
  reps: number;
}
export interface StretchingSetClass extends ExerciseSet {
  duration: number;
}
export interface CardioSetClass extends ExerciseSet {
  duration: number;
  distance: number;
}

export interface Exercise {
  name: string;
  instructions: string[];
  category: string;
  equipment: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
}

export interface ModelExercise extends Exercise {
  sets: ExerciseSet[];
  annotation: string;
}

export interface SessionExercise extends ModelExercise {
  userMediaContent: Asset[];
}

export interface TrainingModel {
  name: string;
  author: string;
  exercises: ModelExercise[];
  mediaContent: Asset[];
  description: string;
  date: number;
}

export interface TrainingSession extends TrainingModel {
  exercises: SessionExercise[];
  duration: number;
  model: string | null;
}
