type unit = {
  mass: string;
  distance: string;
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
    pace: "min/Km"
  },
  imperial: {
    mass: "lb",
    distance: "mi",
    pace: "min/mi"
  }
}

export type available_units = "metric" | "imperial";
