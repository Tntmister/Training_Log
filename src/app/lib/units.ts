import {
  TrainingModel,
  StretchingSetClass,
  CardioSetClass
} from "./types/train"

const KG_TO_LB_RATIO = 2.20462262
const LB_TO_KG_RATIO = 0.45359237

const KM_TO_MILE_RATIO = 0.621371
const MILE_TO_KM_RATIO = 1.609344

type unit = {
  mass: string;
  distance: string;
  time: string;
  pace: string;
};

export type units = {
  metric: unit;
  imperial: unit;
};

export const units_global: units = {
  metric: {
    mass: "kg",
    distance: "km",
    time: "min",
    pace: "min/Km"
  },
  imperial: {
    mass: "lb",
    distance: "mi",
    time: "min",
    pace: "min/mi"
  }
}

export type available_units = "metric" | "imperial";

export function kg_to_lb(weight_in_kg: number): number {
  return Math.round(weight_in_kg * KG_TO_LB_RATIO)
}

export function lb_to_kg(weight_in_lb: number): number {
  return Math.round(weight_in_lb * LB_TO_KG_RATIO)
}

export function km_to_mile(dist_in_km: number): number {
  return Math.round(dist_in_km * KM_TO_MILE_RATIO)
}

export function mile_to_km(dist_in_miles: number): number {
  return Math.round(dist_in_miles * MILE_TO_KM_RATIO)
}

export function presentWeight(
  weight_in_kg: number,
  current_unit: available_units
): number {
  return current_unit == "imperial" ? kg_to_lb(weight_in_kg) : weight_in_kg
}

export function presentDistance(
  dist_in_km: number,
  current_unit: available_units
): number {
  return current_unit == "imperial" ? km_to_mile(dist_in_km) : dist_in_km
}

export function presentPace(
  pace_in_min_per_km: number,
  current_unit: available_units
): number {
  return presentDistance(pace_in_min_per_km, current_unit)
}

export function convertImperialToMetric(train: TrainingModel) {
  const convertedExercises = train.exercises.map((exercise) => {
    const newSets = exercise.sets.map((set) => {
      if (Object.keys(set).includes("distance")) {
        return {
          ...set,
          weight: lb_to_kg(set.weight),
          distance: mile_to_km((set as CardioSetClass).distance)
        }
      } else {
        return { ...set, weight: lb_to_kg(set.weight) }
      }
    })
    return {
      ...exercise,
      sets: newSets
    }
  })
  return { ...train, exercises: convertedExercises }
}

export function convertMetricToImperial(train: TrainingModel): TrainingModel {
  const convertedExercises = train.exercises.map((exercise) => {
    const newSets = exercise.sets.map((set) => {
      if (Object.keys(set).includes("distance")) {
        return {
          ...set,
          weight: kg_to_lb(set.weight),
          distance: km_to_mile((set as CardioSetClass).distance)
        }
      } else {
        return { ...set, weight: kg_to_lb(set.weight) }
      }
    })
    return {
      ...exercise,
      sets: newSets
    }
  })
  return { ...train, exercises: convertedExercises }
}
