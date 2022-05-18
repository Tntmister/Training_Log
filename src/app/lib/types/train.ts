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
  date: number;
}

export interface TrainingSession extends TrainingModel {
  exercises: SessionExercise[];
  duration: number;
  model: string | null;
}
