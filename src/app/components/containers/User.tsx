import React from "react"
import { StyleSheet, Text, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"

const User = (props: { style: any }) => {
  return (
    <View style={styles.Scontainer}>
      <LinearGradient
        colors={["rgba(254,103,81,1)", "rgba(254,103,81,0.65)"]}
        style={styles.background}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={styles.text}>User</Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  Scontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    fontSize: 50
  },
  background: {
    width: "100%",
    height: "50%",
    paddingHorizontal: 30,
    borderRadius: 35
  }
})
export default User
