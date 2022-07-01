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
