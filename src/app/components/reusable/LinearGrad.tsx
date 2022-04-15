import { ThemeContext } from "../App"
import LinearGradient from "react-native-linear-gradient"
import React, { ReactNode } from "react"
import { StyleSheet } from "react-native"

export default function LinearGrad(props: {
  height: number;
  children: ReactNode[];
}) {
  const theme = React.useContext(ThemeContext)
  const colorStart = theme.colors.main
  const colorEnd = theme.colors.mainEnd
  return (
    <LinearGradient
      colors={[colorStart, colorEnd]}
      style={{ ...styles.linearGradient, height: props.height }}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      {props.children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    width: "98%",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5
    //flexWrap: "wrap"
  }
})
