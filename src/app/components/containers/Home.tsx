import React from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { theme1 } from "../../styles/styles"
import { logout } from "../../lib/firebase"
import Button from "../reusable/MyButton"

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme1.colors.background}></StatusBar>
      <Text style={styles.text}>Home</Text>
      <Button onPress={logout} title="Sign Out" />
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
