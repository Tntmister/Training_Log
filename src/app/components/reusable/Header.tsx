import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { theme1 } from "../../styles/styles"

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
    backgroundColor: theme1.colors.background[1]
  },
  text: {
    fontWeight: "bold",
    fontSize: theme1.sizes.icon_size_focused,
    color: theme1.colors.foreground
  }
})

export default Header
