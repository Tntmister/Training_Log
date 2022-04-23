import { exercises } from "../../dataDefinition/exercises.json"
import { Exercise } from "../../dataDefinition/data"

export function getExercises(query: string): Exercise[] {
  return query === ""
    ? exercises
    : exercises.filter((ex) =>
      ex.name.toLowerCase().includes(query.toLowerCase())
    )
}
