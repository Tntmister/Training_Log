import { exercises } from "../assets/exercises"

export const categoryIcons = {
  cardio: require("../assets/icons/ex_categ/cardio/cardio(-xxxhdpi).png"),
  plyometrics: require("../assets/icons/ex_categ/plyometrics/plyometrics(-xxxhdpi).png"),
  strength: require("../assets/icons/ex_categ/strength/strength(-xxxhdpi).png"),
  stretching: require("../assets/icons/ex_categ/stretching/stretching(-xxxhdpi).png"),
  weightlifting: require("../assets/icons/ex_categ/weightlifting/weightlifting(-xxxhdpi).png")
}

export function getExercises(
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
  console.log(category)
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
