import LinearGradient from "react-native-linear-gradient"
import React, { ReactNode } from "react"
import { StyleSheet } from "react-native"

export default function LinearGrad(props: {
  height: number;
  children: ReactNode[] | ReactNode;
  bgStart: string;
  bgEnd: string;
  center: boolean;
}) {
  const center = props.center ? "center" : "flex-start"
  return (
    <LinearGradient
      colors={[props.bgStart, props.bgEnd]}
      style={{
        ...styles.linearGradient,
        height: props.height,
        justifyContent: center
      }}
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
    paddingHorizontal: 15
  }
})
