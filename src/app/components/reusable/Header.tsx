import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Style from "../../styles/styles"

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Header</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Style.background[1]
  },
  text: {
    fontWeight: "bold",
    fontSize: Style.icon_size_focused,
    color: Style.text[1]
  }
})

export default Header
