import { Asset } from "react-native-image-picker"
// Sets

export abstract class ExerciseSet {
  weight: number;
  done = false;

  constructor(weight = 0) {
    this.weight = weight
  }
  static fromObject(category: string, obj?: ExerciseSet): ExerciseSet {
    switch (category.toLowerCase()) {
      case "cardio":
        return Object.assign(new CardioSetClass(), obj)
      case "stretching":
        return Object.assign(new StretchingSetClass(), obj)
      default:
        return Object.assign(new RegularSetClass(), obj)
    }
  }

  withWeight(weight: number) {
    const clone = this.clone()
    clone.weight = weight
    return clone
  }

  withToggledDone() {
    const clone = this.clone()
    clone.done = !clone.done
    return clone
  }

  clone(): ExerciseSet {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}
export class RegularSetClass extends ExerciseSet {
  reps: number;

  constructor(reps = 0, weight = 0) {
    super(weight)
    this.reps = reps
  }

  withReps(reps: number) {
    const clone = this.clone() as RegularSetClass
    clone.reps = reps
    return clone
  }
}

export class StretchingSetClass extends ExerciseSet {
  duration = 0;

  constructor(duration = 0, weight = 0) {
    super(weight)
    this.duration = duration
  }

  withDuration(duration: number) {
    const clone = this.clone() as StretchingSetClass
    clone.duration = duration
    return clone
  }
}
export class CardioSetClass extends ExerciseSet {
  duration: number;
  distance: number;

  constructor(duration = 0, distance = 0, weight = 0) {
    super(weight)
    this.duration = duration
    this.distance = distance
  }

  withDuration(duration: number) {
    const clone = this.clone() as CardioSetClass
    clone.duration = duration
    return clone
  }

  withDistance(distance: number) {
    const clone = this.clone() as CardioSetClass
    clone.distance = distance
    return clone
  }
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

  constructor(params: IExercise) {
    this.name = params.name
    this.instructions = params.instructions
    this.category = params.category
    this.equipment = params.equipment
    this.primaryMuscle = params.primaryMuscle
    this.secondaryMuscles = params.secondaryMuscles
  }

  clone(): Exercise {
    const clone = Object.create(this)
    clone.name = this.name
    clone.instructions = [...this.instructions]
    clone.category = this.category
    clone.equipment = this.equipment
    clone.primaryMuscle = this.primaryMuscle
    clone.secondaryMuscles = [...this.secondaryMuscles]
    return clone
  }
}

export class ExerciseModel extends Exercise {
  sets: ExerciseSet[] = [];
  annotation = "";

  constructor(exercise: Exercise) {
    super(exercise)
  }

  withAnnotation(annotation: string) {
    const clone = this.clone()
    clone.annotation = annotation
    return clone
  }

  withNewSet(): ExerciseModel {
    const clone = this.clone()
    clone.sets.push(ExerciseSet.fromObject(this.category))
    return clone
  }

  clone(): ExerciseModel {
    const clone = new ExerciseModel(super.clone())
    clone.sets = this.sets.map((set) => set.clone())
    clone.annotation = this.annotation
    return clone
  }
}

export class ExerciseSession extends ExerciseModel {
  userMediaContent: Asset[] = [];

  constructor(exercise: ExerciseModel) {
    const clone = exercise.clone()
    super(clone)
    this.sets = clone.sets
  }
}

export interface ITrainingModel {
  name: string;
  author: string;
  exercises: ExerciseModel[];
  mediaContent: Asset[];
  description: string;
}
export class TrainingModel implements ITrainingModel {
  name = "New Training Model";
  author: string;
  exercises: ExerciseModel[] = [];
  mediaContent: Asset[] = [];
  description = "";

  constructor(author: string) {
    this.author = author
  }

  static import(modelData: ITrainingModel) {
    const model = new TrainingModel(modelData.author)
    model.name = modelData.name
    model.exercises = modelData.exercises.map((ex) => {
      const exModel = new ExerciseModel(new Exercise(ex))
      exModel.annotation = ex.annotation
      exModel.sets = ex.sets.map((set) => {
        return ExerciseSet.fromObject(ex.category, set)
      })
      return exModel
    })
    model.mediaContent = modelData.mediaContent.map((asset) => ({ ...asset }))
    model.description = modelData.description
    return model
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

  withoutExercise(exercise: ExerciseModel) {
    const clone = this.clone()
    this.exercises = clone.exercises.filter((ex) => ex.name != exercise.name)
    return clone
  }

  withExercises(exercises: Exercise[]) {
    const clone = this.clone()
    exercises.forEach((ex) => {
      clone.exercises.push(new ExerciseModel(ex).withNewSet())
    })
    return clone
  }

  clone(): TrainingModel {
    const model = Object.create(this)
    model.name = this.name
    model.author = this.author
    model.exercises = this.exercises.map((ex) => ex.clone())
    model.mediaContent = this.mediaContent.map((asset) => ({ ...asset }))
    model.description = this.description
    return model
  }
}

export class TrainingSession extends TrainingModel {
  duration = 0;
  done = false;
  date = Date.now();

  constructor(model: TrainingModel) {
    super(model.author)
    this.name = model.name
    this.exercises = model.exercises.map((ex) => new ExerciseSession(ex))
    this.mediaContent = model.mediaContent
    this.description = model.description
  }

  withIncrementDuration() {
    const clone = this.clone()
    clone.duration!++
    return clone
  }

  withFinishSession() {
    const clone = this.clone()
    clone.done = true
    return clone
  }

  clone(): TrainingSession {
    const clone = new TrainingSession(super.clone())
    clone.duration = this.duration
    clone.done = this.done
    clone.date = this.date
    return clone
  }
}
