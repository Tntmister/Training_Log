import { Asset } from "react-native-image-picker"
// Sets
export class ExerciseSet {
  weight = 0;
  done = false;
}
export class RegularSetClass extends ExerciseSet {
  reps = 0;
}
export class StretchingSetClass extends ExerciseSet {
  duration = 0;
}
export class CardioSetClass extends ExerciseSet {
  duration = 0;
  distance = 0;
}

export interface IExercise {
  name: string;
  instructions: string[];
  category: string;
  equipment: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
}
export class Exercise implements IExercise {
  name: string;
  instructions: string[];
  category: string;
  equipment: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  sets: ExerciseSet[] = [];
  userAnnotation = "";
  userMediaContent: Asset[] = [];

  constructor(params: IExercise) {
    this.name = params.name
    this.instructions = params.instructions
    this.category = params.category
    this.equipment = params.equipment
    this.primaryMuscle = params.primaryMuscle
    this.secondaryMuscles = params.secondaryMuscles
  }

  clone() {
    return new Exercise({
      name: this.name,
      instructions: [...this.instructions],
      category: this.category,
      equipment: this.equipment,
      primaryMuscle: this.primaryMuscle,
      secondaryMuscles: [...this.secondaryMuscles]
    })
  }

  withAnnotation(annotation: string) {
    this.userAnnotation = annotation
    return this
  }

  withNewSet() {
    this.sets.push(
      this.category == "Cardio"
        ? new CardioSetClass()
        : this.category == "Stretching"
          ? new StretchingSetClass()
          : new RegularSetClass()
    )
    return this
  }
}

/* export class ExerciseSession extends Exercise {
  sets: ExerciseSet[] = [];
  userAnnotation = "";
  userMediaContent: Asset[] = [];

  constructor(exercise: Exercise) {
    super(exercise.clone())
  }
} */

export class TrainingModel {
  name = "New Training Model";
  author: string;
  exercises: Exercise[] = [];
  mediaContent: Asset[] = [];
  description = "";
  duration = 0;
  done = false;

  constructor(author: string) {
    this.author = author
  }

  withBeginSession() {
    const clone = this.clone()
    clone.duration = 0
    clone.done = false
    return clone
  }

  withFinishSession() {
    const clone = this.clone()
    clone.done = true
    return clone
  }

  withName(name: string) {
    const clone = this.clone()
    clone.name = name
    return clone
  }

  withDescription(description: string) {
    const clone = this.clone()
    clone.description = description
    return clone
  }

  withoutExercise(exercise: Exercise) {
    const clone = this.clone()
    this.exercises = clone.exercises.filter((ex) => ex.name != exercise.name)
    return clone
  }

  withExercises(exercises: Exercise[]) {
    const clone = this.clone()
    exercises.forEach((ex) => clone.exercises.push(ex.withNewSet()))
    return clone
  }

  withIncrementDuration() {
    const clone = this.clone()
    clone.duration!++
    return clone
  }

  clone() {
    const model = new TrainingModel(this.author)
    model.name = this.name
    model.exercises = this.exercises.map((ex) => ex.clone())
    model.mediaContent = this.mediaContent.map((asset) => ({ ...asset }))
    model.description = this.description
    model.duration = this.duration
    model.done = this.done
    return model
  }
}

/* export class TrainingSession {
  name: string;
  author: string;
  exercises: ExerciseSession[];
  mediaContent: Asset[];
  description: string;
  duration = 0;
  done = false;
  date = Date.now();

  constructor(model: TrainingModel) {
    this.name = model.name
    this.author = model.author
    this.exercises = model.exercises.map((ex) => new ExerciseSession(ex))
    this.mediaContent = model.mediaContent
    this.description = model.description
  }
} */
