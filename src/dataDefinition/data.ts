/*
    1. Barbell
    2. Dumbbell
    3. Machine
    4. BodyWeight
    5. Cardio
    6. Endurance
*/

import { Asset } from "react-native-image-picker"

// Component that can have multimedia content attached

class MediaComponent {
  mediaContent: [] = [];
  annotation = "";
  /*constructor() {
    this.extraContent = { images: [], video: [] }
  }*/
}

// Sets

export class WESet extends MediaComponent {
  weight = 0;
  repRange = [0, 0];
  repsDone? = 0;
}

export type WESetType = {
  weight: number;
  repRange: number[];
  repsDone?: number;
  mediaContent: Asset[];
  annotation: string;
};

export type GeneralExercise = {
  weight?: number;
  repRange?: number[];
  repsDone?: number;
  wantedDuration?: string;
  duration?: string;
  mediaContent: Asset[];
  annotation: string;
};
export class StretchingSet extends MediaComponent {
  wantedDuration = "00:00";
  duration = "00:00";
  weight = 0;
}

export type StretchingSetType = {
  wantedDuration: string;
  duration: string;
  mediaContent: Asset[];
  annotation: string;
  weight: number;
};

export class CardioSet extends MediaComponent {
  duration = "00:00";
  weight = 0;
  distance = 0;
}

export type CardioSetType = {
  distance: number;
  duration: string;
  mediaContent: Asset[];
  annotation: string;
  weight: number;
};

// Exercises
export type Exercise = {
  name: string;
  instructions: string[];
  category: string;
  equipment: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  sets: WESetType[] | StretchingSetType[] | CardioSetType[];
};
/* 
export class WeightExercise extends Exercise {
  multiplier = 1;
  sets: WESet[] = [];
}

export class DurationExercise extends Exercise {
  sets: DESet[] = [];
} */
/*
export class BarbellExercise extends WeightExercise {
  categorie = 1;
}

export class DumbbellExercise extends WeightExercise {
  multiplier = 2;
  categorie = 2;
}

export class MachineExercise extends WeightExercise {
  categorie = 3;
}

export class BodyWeightExercise extends WeightExercise {
  categorie = 4;
  assisted = false;
  assistance = 0;
  weighted = false;
  weigth = 0;
}

export class CardioExercise extends DurationExercise {
  categorie = 5;
}

export class EnduranceExercise extends DurationExercise {
  categorie = 6;
}*/

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

// Training Model
/* export class TrainingModel extends MediaComponent {
  name = "New Training Model";
  author = "";
  exercises: Exercise[] = [];

  public startSession(): TrainingSession {
    return new TrainingSession(this.exercises, this.name)
  }
} */

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
