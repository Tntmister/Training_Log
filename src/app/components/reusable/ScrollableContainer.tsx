import React, { ReactNode } from "react"
import { StyleSheet, View } from "react-native"

export default function ScrollableContainer(props: {
  children: ReactNode[] | ReactNode;
}) {
  return <View style={styles.globalContainer}>{props.children}</View>
}

const styles = StyleSheet.create({
  globalContainer: {
    height: "85%"
  }
})
