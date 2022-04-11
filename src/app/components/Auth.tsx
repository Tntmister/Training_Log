import React, { useContext, useState } from "react"
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native"
import UserContext from "../UserContext"

export default function Auth() {
  const user = useContext(UserContext)
  const [login, setLogin] = useState(true)

  function toggleMethod() {
    setLogin(!login)
  }

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={{ height: "30%" }}
        source={require("../assets/logo/logo1.png")}
      />
      {login ? (
        <>
          <Text style={styles.text}>Sign In</Text>
          <Button title="Sign Up" onPress={toggleMethod}></Button>
        </>
      ) : (
        <>
          <Text style={styles.text}>Sign Up</Text>
          <Button title="Sign In" onPress={toggleMethod}></Button>
        </>
      )}
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
