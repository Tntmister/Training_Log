import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
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
  muscles = [...new Set(exercises.map((attr) => attr.primaryMuscle))].sort()
  equipments = [...new Set(exercises.map((attr) => attr.equipment))].sort()
  categories = [...new Set(exercises.map((attr) => attr.category))].sort()
}

export async function getImages(name: string) {
  const urls: string[] = []
  const list = await storage()
    .ref(`exercises/${name.replace("/", "_")}`)
    .list()
  for (const ref of list.items) {
    urls.push(await ref.getDownloadURL())
  }
  return urls
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

export let muscles: string[] = []

export let equipments: string[] = []

export let categories: string[] = []
