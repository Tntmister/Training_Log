import firestore from "@react-native-firebase/firestore"
import { Exercise } from "../../dataDefinition/data"

export const categoryIcons = {
  Cardio: require("../assets/icons/ex_categ/cardio/cardio(-xxxhdpi).png"),
  Plyometrics: require("../assets/icons/ex_categ/plyometrics/plyometrics(-xxxhdpi).png"),
  Strength: require("../assets/icons/ex_categ/strength/strength(-xxxhdpi).png"),
  Stretching: require("../assets/icons/ex_categ/stretching/stretching(-xxxhdpi).png"),
  Weightlifting: require("../assets/icons/ex_categ/weightlifting/weightlifting(-xxxhdpi).png")
}

export const exercises: Exercise[] = []
export async function initExercises() {
  const result = await firestore().collection("exercises").get()
  result.forEach((doc) => exercises.push({ ...(doc.data() as Exercise) }))
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
    result = exercises.filter(
      (ex) => ex.category.toLowerCase() === category.toLowerCase()
    )
  }
  if (muscle != undefined) {
    result = exercises.filter(
      (ex) => ex.primaryMuscle.toLowerCase() === muscle.toLowerCase()
    )
  }
  if (equipments.length > 0) {
    result = exercises.filter((ex) =>
      equipments.substring(1).split(",").includes(ex.equipment)
    )
  }
  return result
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
