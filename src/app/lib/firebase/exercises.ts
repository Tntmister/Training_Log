import storage, { firebase } from "@react-native-firebase/storage"
import firestore from "@react-native-firebase/firestore"
import { Asset } from "react-native-image-picker"
import { exercises } from "../../assets/exercises/exercises_en"
import {
  CardioSetClass,
  Exercise,
  ExerciseHistory,
  RegularSetClass,
  StretchingSetClass,
  TrainingSession
} from "../types/train"

export const categoryIcons = {
  Cardio: require("../../assets/icons/ex_categ/cardio/cardio(-xxxhdpi).png"),
  Plyometrics: require("../../assets/icons/ex_categ/plyometrics/plyometrics(-xxxhdpi).png"),
  Strength: require("../../assets/icons/ex_categ/strength/strength(-xxxhdpi).png"),
  Stretching: require("../../assets/icons/ex_categ/stretching/stretching(-xxxhdpi).png"),
  Weightlifting: require("../../assets/icons/ex_categ/weightlifting/weightlifting(-xxxhdpi).png")
}

export const muscles = [
  ...new Set(exercises.map((attr) => attr.primaryMuscle))
].sort()

export const equipments = [
  ...new Set(exercises.map((attr) => attr.equipment))
].sort()

export const categories = [
  ...new Set(exercises.map((attr) => attr.category))
].sort()

/* export async function initExercises() {
  const result = await firestore().collection("exercises").get()
  result.forEach((doc) => exercises.push({ ...(doc.data() as Exercise) }))
  muscles = [...new Set(exercises.map((attr) => attr.primaryMuscle))].sort()
  equipments = [...new Set(exercises.map((attr) => attr.equipment))].sort()
  categories = [...new Set(exercises.map((attr) => attr.category))].sort()
} */

/**
 * @param name Nome do Exercício
 * @returns Promessa sobre array de URLs de imagens do exercício
 */
export async function getImages(name: string) {
  return new Promise<Asset[]>((resolve, reject) => {
    storage()
      .ref(`exercises/${name.replace("/", "_")}`)
      .list()
      .then(
        async (list) => {
          const assets: Asset[] = []
          for (const ref of list.items) {
            assets.push({
              uri: await ref.getDownloadURL(),
              type: (await ref.getMetadata()).contentType!
            })
          }
          resolve(assets)
        },
        (reason) => {
          console.warn("exercise - getImages rejected: " + reason)
          reject(reason)
        }
      )
  })
}

export function searchExercises(
  query: string,
  category: string | undefined,
  muscle: string | undefined,
  equipments: string
): typeof exercises {
  let result =
    query === ""
      ? exercises
      : exercises.filter((ex) =>
        ex.name.toLowerCase().includes(query.toLowerCase())
      )
  if (category != undefined) {
    result = result.filter(
      (ex) => ex.category.toLowerCase() === category.toLowerCase()
    )
  }
  if (muscle != undefined) {
    result = result.filter(
      (ex) => ex.primaryMuscle.toLowerCase() === muscle.toLowerCase()
    )
  }
  if (equipments.length > 0) {
    result = result.filter((ex) =>
      equipments.substring(1).split(",").includes(ex.equipment)
    )
  }
  return result
}

export function getExerciseHistory(
  name: string,
  onLoad: (history: ExerciseHistory[]) => void
) {
  const uID = firebase.auth().currentUser!.uid
  const exerciseHistory: ExerciseHistory[] = []
  firestore()
    .collection(`users/${uID}/sessions`)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        const session = documentSnapshot.data() as TrainingSession
        if (session.exercises.filter((ex) => ex.name == name).length > 0) {
          exerciseHistory.push({
            date: session.date,
            exercises: session.exercises.filter((ex) => ex.name == name)
          } as ExerciseHistory)
        }
      })
      onLoad(exerciseHistory)
    })
}

export function getExercise1RMs(history: ExerciseHistory[]) {
  const result = history.map((record) => {
    const ONE_RM = Math.max(
      ...record.exercises.map((ex) =>
        getSession1RM(ex.sets as RegularSetClass[])
      )
    )
    return { date: record.date, ONE_RM: ONE_RM }
  })
  return result
}

function getSession1RM(session_ex: RegularSetClass[]) {
  return Math.max(...session_ex.map((set) => calc1RM(set.weight, set.reps)))
}

function calc1RM(weight: number, reps: number) {
  return Math.round(weight / (1.0278 - 0.0278 * reps))
}

export function isStrOrWLExercise(exercise: Exercise) {
  return (
    exercise.category == "Strength" || exercise.category == "Weightlifting"
  )
}

export function isCardioExercise(exercise: Exercise) {
  return exercise.category == "Cardio"
}

export function isStretchingExercise(exercise: Exercise) {
  return exercise.category == "Stretching"
}

export function getExercisePaces(history: ExerciseHistory[]) {
  const result = history.map((record) => {
    const bestPace = Math.max(
      ...record.exercises.map((ex) =>
        getSessionBestPace(ex.sets as CardioSetClass[])
      )
    )
    return { date: record.date, pace: bestPace }
  })
  return result
}

function getSessionBestPace(session_ex: CardioSetClass[]) {
  return Math.max(
    ...session_ex.map((set) => calcPace(set.distance, set.duration))
  )
}

function calcPace(distance: number, duration: number) {
  return distance / (duration / 3600)
}

export function getExerciseDurations(history: ExerciseHistory[]) {
  const result = history.map((record) => {
    const longestDur = Math.max(
      ...record.exercises.map((ex) =>
        getSessionBestDuration(ex.sets as StretchingSetClass[])
      )
    )
    return { date: record.date, duration: longestDur }
  })
  return result
}

function getSessionBestDuration(session_ex: StretchingSetClass[]) {
  return Math.max(...session_ex.map((set) => set.duration))
}
