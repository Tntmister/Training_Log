import React from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import Style from "../../styles/styles"

const Home = (props: any) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Style.background[1]}></StatusBar>
      <Text style={styles.text}>Home</Text>
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

export default Home
