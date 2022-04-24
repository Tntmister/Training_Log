import React, { useContext } from "react"
import { StyleSheet, View } from "react-native"
import { ThemeContext, useTheme } from "../../providers/Theme"
import { RFValue } from "react-native-responsive-fontsize"
import { logout } from "../../lib/firebaseAuth"
import { Button } from "../reusable/Button"
import { Switch } from "react-native-paper"
import { Text } from "../reusable/Text"

export default function Home() {
  const theme = useTheme()
  const { toggleTheme, dark } = useContext(ThemeContext)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
  })
  return (
    <View style={{ ...styles.container }}>
      <Text style={{ fontSize: RFValue(50) }}>Home</Text>
      <Button onPress={logout}>Sign Out</Button>
      <Switch onValueChange={toggleTheme} value={dark} />
    </View>
  )
}
