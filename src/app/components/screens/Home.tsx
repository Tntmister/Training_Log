import React from "react"
import { StatusBar, StyleSheet, Text, View } from "react-native"
import { logout } from "../../lib/firebase"
import Button from "../reusable/MyButton"
import { Button as Button2 } from "react-native-paper"
import { ThemeContext } from "../../App"

const Home = () => {
  const theme = React.useContext(ThemeContext)
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <StatusBar backgroundColor={theme.colors.background}></StatusBar>
      <Text style={styles.text}>Home</Text>
      <Button onPress={logout} title="Sign Out" />
      <Button2 mode="contained">Test</Button2>
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
