import React from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { theme1 } from "../../styles/styles"

const History = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme1.colors.background}></StatusBar>
      <Text style={styles.text}>History</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    fontSize: 50
  }
})

export default History
