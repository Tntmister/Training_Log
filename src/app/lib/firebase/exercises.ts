import storage from "@react-native-firebase/storage"
import { Asset } from "react-native-image-picker"
import { exercises } from "../../assets/exercises_en"

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
export async function getImages(name: string): Promise<Asset[]> {
  const assets: Asset[] = []
  const list = await storage()
    .ref(`exercises/${name.replace("/", "_")}`)
    .list()
  for (const ref of list.items) {
    assets.push({
      uri: await ref.getDownloadURL(),
      type: (await ref.getMetadata()).contentType!
    })
  }
  return assets
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
