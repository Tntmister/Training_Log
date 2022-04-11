import React from "react"
import { StyleSheet, Text, View } from "react-native"

const User = (props: { style: any }) => {
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
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    fontSize: 50
  }
})
export default User
