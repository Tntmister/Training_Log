import { exercise, exercises } from "../assets/exercises"

export const categoryIcons = {
  cardio: require("../assets/icons/ex_categ/cardio/cardio(-xxxhdpi).png"),
  plyometrics: require("../assets/icons/ex_categ/plyometrics/plyometrics(-xxxhdpi).png"),
  strength: require("../assets/icons/ex_categ/strength/strength(-xxxhdpi).png"),
  stretching: require("../assets/icons/ex_categ/stretching/stretching(-xxxhdpi).png"),
  weightlifting: require("../assets/icons/ex_categ/weightlifting/weightlifting(-xxxhdpi).png")
}

export function getExercises(query: string): exercise[] {
  return query === ""
    ? exercises
    : exercises.filter((ex) =>
      ex.name.toLowerCase().includes(query.toLowerCase())
    )
}
