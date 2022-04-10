import React from "react"
import { StyleSheet, Text, View } from "react-native"

const User = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F2C3B"
  },
  text: {
    color: "#E9E9E9",
    fontWeight: "bold",
    fontSize: 50
  }
})
export default User
