import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { logout } from "../../lib/firebase"
import Button from "../reusable/MyButton"

const Home = (props: { style: any }) => {
  return (
    <View style={styles.container}>
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
