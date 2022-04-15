/*const Style = {
  background: {
    1: "#2F2C3B",
    2: "#21222D"
  },
  text: {
    1: "#E9E9E9",
    2: "#FCFCFC"
  },
  main: {
    1: "#FE6751",
    2: "#D5FE01"
  },
  icon_size: 25,
  icon_size_focused: 30
}
*/

export const theme1 = {
  colors: {
    background: "#2F2C3B",
    foreground: "#E9E9E9",
    main: "rgba(254,103,81,1)",
    mainEnd: "rgba(254,103,81,0.80)"
  },
  sizes: {
    icon_size: 25,
    icon_size_focused: 30
  },
  text: {
    fontSizeSmall: 16,
    fontSizeMS: 18,
    fontSizeMedium: 20,
    fontSizeBig: 30
  }
}

export const lightTheme1 = {
  ...theme1,
  colors: {
    background: "#E9E9E9",
    foreground: "#2F2C3B",
    main: "#FE6751"
  }
}

export const theme2 = {
  ...theme1,
  colors: {
    background: "#21222D",
    foreground: "#FCFCFC",
    main: "#D5FE01"
  }
}

export const lightTheme2 = {
  ...theme2,
  colors: {
    background: "#FCFCFC",
    foreground: "#21222D",
    main: "#D5FE01"
  }
}
