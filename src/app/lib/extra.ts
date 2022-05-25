import { RegularSetClass, TrainingSession } from "./types/train"

export const images = {
  User: require("../assets/icons/user/user(-xxxhdpi).png"),
  History: require("../assets/icons/history/history(-xxxhdpi).png"),
  Home: require("../assets/icons/home/home(-xxxhdpi).png"),
  Search: require("../assets/icons/search/search(-xxxhdpi).png"),
  Train: require("../assets/icons/train/train(-xxxhdpi).png"),
  Camera: require("../assets/icons/camera/camera(-xxxhdpi).png"),
  Checked: require("../assets/icons/checked/checked(-xxxhdpi).png"),
  Trash: require("../assets/icons/trash/trash(-xxxhdpi).png"),
  Calendar: require("../assets/icons/calendar/calendar-100.png"),
  Weight: require("../assets/icons/weight/weight-52.png"),
  Logo: require("../assets/logo/logo1.png")
}

export function getDate(timestamp: number | string | undefined): string {
  if (timestamp === undefined) return "Invalid Date"
  const date = new Date(timestamp)
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  const month =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function getDuration(millis: number): string {
  if (millis === undefined) return "Invalid Duration"
  const totalSecs = millis / 1000
  const hours = Math.floor(totalSecs / 3600)
  const minutes = Math.floor((totalSecs % 3600) / 60)

  const fHours = hours < 10 ? "0" + hours : hours
  const fMinutes = minutes < 10 ? "0" + minutes : minutes
  return `${fHours}h ${fMinutes}m`
}

export function getTotalWeight(session: TrainingSession): number {
  let total = 0
  for (const exercise of session.exercises) {
    const multiplier = exercise.equipment == "Dumbbell" ? 2 : 1
    for (const set of exercise.sets) {
      const reps =
        exercise.category == "Stretching" || exercise.category == "Cardio"
          ? 1
          : (set as RegularSetClass).reps
      total += set.weight * reps * multiplier
    }
  }

  return total
}
